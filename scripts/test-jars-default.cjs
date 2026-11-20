// Execute the actual wrapper schema, dependency function and daemon definitions
// with the StartOS host boundary replaced by an unfunded in-memory fixture.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { z } = require('zod');
const root = path.resolve(__dirname, '..');
async function scenario(saved, bridge = '127.0.0.1:18443') {
  const cache = new Map(); let schema, bridgeRequests = 0;
  const mounts = () => ({items:[], mountVolume(item){this.items.push({volume:item});return this;},mountDependency(item){this.items.push({dependency:item});return this;}});
  const sdk = {
    volumes:{main:'main'}, setupMain:fn=>fn, setupDependencies:fn=>fn,
    Mounts:{of:mounts}, SubContainer:{of:(_effects,image,mounts,name)=>({image,mounts,name})},
    Daemons:{of:()=>({items:{},addDaemon(name,value){this.items[name]=typeof value==='function'?value():value;return this;},addOneshot(name,value){this.items[name]=value();return this;}})},
    host:{getBridgeAddress:(_effects,request)=>{assert.equal(request.packageId,'knots-blake2b');bridgeRequests++;return {const:async()=>bridge};}},
    useEntrypoint:()=>['entrypoint'],
  };
  const store = {read:fn=>({const:async()=>saved===null?null:fn(schema.parse(saved))})};
  function load(file) {
    if(cache.has(file))return cache.get(file).exports;
    const module={exports:{}};cache.set(file,module);
    const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
    const requireFixture=name=>{
      if(name==='@start9labs/start-sdk')return {z,FileHelper:{json:(_location,value)=>{schema=value;return store;}}};
      if(name.endsWith('/sdk')||name==='./sdk')return {sdk};
      if(name==='./i18n')return {i18n:value=>value};
      if(name==='./utils')return {uiPort:3000};
      return load(path.resolve(path.dirname(file),name)+'.ts');
    };
    vm.runInNewContext(code,{exports:module.exports,module,require:requireFixture},{filename:file});return module.exports;
  }
  const main=load(path.join(root,'startos/main.ts')).main;
  const dependencies=load(path.join(root,'startos/dependencies.ts')).setDependencies;
  const deps=await dependencies({effects:{}}), daemons=await main({effects:{}});
  return {deps,items:daemons.items,bridgeRequests};
}
(async()=>{
  for(const saved of [null,{},{backend:'manual'},{backend:'knots-blake2b'},{backend:'manual',bundledJam:true}]){
    const {deps,items}=await scenario(saved);
    assert(deps['knots-blake2b'],'Fresh/old installations declare the node dependency');
    assert(items.jam&&items['jam-rpc'],'Bundled runtime starts without a settings action');
    assert.equal(items.wallet.exec.env.BARKD_JOINBLAKET_URL,'https://localhost:28183');
    assert.equal(items['jam-rpc'].exec.env.PAPERCLIP_NODE_RPC_URL,'http://127.0.0.1:18443');
    assert.equal(items.wallet.exec.env.PAPERCLIP_NODE_RPC_URL,saved?.backend==='knots-blake2b'?'http://127.0.0.1:18443':undefined,'Jars must not change main wallet node selection');
    assert.equal(items.wallet.requires.length,0,'Jars outages must not block wallet recovery');
    assert(!items.jam.subcontainer.mounts.items.some(item=>item.dependency),'Jam never mounts node credentials');
    assert(items['jam-rpc'].subcontainer.mounts.items.some(item=>item.dependency?.readonly));
  }
  const off=await scenario({backend:'manual',bundledJam:false});
  assert.equal(off.items.jam,null);assert.equal(off.items['jam-rpc'],null);assert.equal(off.bridgeRequests,0);assert.equal(Object.keys(off.deps).length,0);
  const malformed=await scenario({backend:'manual',bundledJam:'false'});assert.equal(malformed.items.jam,null,'Malformed saved choices must not enable Jars');
  const nodeOnly=await scenario({backend:'knots-blake2b',bundledJam:false});
  assert.equal(nodeOnly.items.jam,null);assert(nodeOnly.deps['knots-blake2b']);assert(nodeOnly.items.wallet.exec.env.PAPERCLIP_NODE_RPC_URL);
  const absent=await scenario({},null);assert(absent.items.wallet);assert.equal(absent.items.jam,null);assert(absent.deps['knots-blake2b']);
  console.log('PASS fresh/upgrade Jars defaults, independent node selection, explicit disable, missing dependency and credential isolation');
})().catch(error=>{console.error(error);process.exit(1);});
