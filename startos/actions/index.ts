import {utils} from '@start9labs/start-sdk'
import {sdk} from '../sdk'
import {store} from '../fileModels/store'
import {i18n} from '../i18n'
const spec=sdk.InputSpec.of({configuration:sdk.Value.text({name:i18n('Configuration JSON'),description:i18n('Use the example in the instructions. Keep passwords private.'),required:true,masked:true,default:"{\n  \"network\": \"bitcoin\",\n  \"asp_url\": \"http://STARTOS_LAN_IP:ARK_INTERFACE_PORT\"\n}"}),rotateToken:sdk.Value.toggle({name:i18n('Rotate access token'),description:i18n('Invalidates the previous web access token on next start.'),default:false})})
export const configure=sdk.Action.withInput('configure',async()=>({name:i18n('Configure test app'),description:i18n('Configure this isolated test instance while stopped.'),warning:i18n('Experimental and unaudited. Back up before changing settings.'),allowedStatuses:'only-stopped',group:null,visibility:'enabled',access:'user'}),spec,async()=>{const s=await store.read().once();return {configuration:s?.configuration||"{\n  \"network\": \"bitcoin\",\n  \"asp_url\": \"http://STARTOS_LAN_IP:ARK_INTERFACE_PORT\"\n}",rotateToken:false}},async({effects,input})=>{
 if(input.configuration.length>65536)throw new Error(i18n('Configuration too large'))
 const c=JSON.parse(input.configuration)
 if(!['bitcoin','regtest'].includes(c.network))throw new Error(i18n('Unsupported network'))
 const endpoint=new URL(c.asp_url)
 if(!['http:','https:'].includes(endpoint.protocol)||endpoint.username||endpoint.password||endpoint.search||endpoint.hash)throw new Error(i18n('Invalid endpoint'))
 if(JSON.stringify(c).length>65536)throw new Error(i18n('Configuration too large'))
 const old=await store.read().once()
 const token=old?.token&&!input.rotateToken?old.token:utils.getDefaultString({charset:'0-9,a-f',len:64})
 const postgres=old?.postgres||utils.getDefaultString({charset:'a-z,A-Z,0-9',len:48})
 await sdk.SubContainer.withTemp(effects,{imageId:'app'},sdk.Mounts.of(),'validate-settings',async sub=>{await sub.execFail(['python3','/opt/startos/check-settings.py','wallet'],{input:JSON.stringify(c)},15000)})
 await store.merge(effects,{configuration:JSON.stringify(c),token,postgres})
 return {version:'1',title:i18n('Configuration saved'),message:i18n('Start the app. Keep this credential private.'),result:{type:'single',name:i18n('Access token'),description:null,value:Buffer.concat([Buffer.from([0]),Buffer.from(token,'hex')]).toString('base64url'),masked:true,copyable:true,qr:false}}
})


const inspect=sdk.Action.withoutInput('connection-info',async()=>({name:i18n('Connection details and funding information'),description:i18n('Connection details and funding information'),warning:i18n('Keep these details private'),allowedStatuses:'only-running',group:null,visibility:'enabled',access:'user'}),async({effects})=>{const value=await sdk.SubContainer.withTemp(effects,{imageId:'app'},sdk.Mounts.of().mountVolume({volumeId:'main',subpath:null,mountpoint:'/data',readonly:true}),'connection-info',async sub=>String((await sub.execFail(["python3", "/opt/startos/connection.py"],{},15000)).stdout));return {version:'1',title:i18n('Connection details and funding information'),message:i18n('Keep these details private'),result:{type:'single',name:i18n('Connection details and funding information'),description:null,value,masked:true,copyable:true,qr:false}}})
export const actions=sdk.Actions.of().addAction(configure).addAction(inspect)
