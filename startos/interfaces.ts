import {sdk} from './sdk'
import {i18n} from './i18n'
export const setInterfaces=sdk.setupInterfaces(async({effects})=>{
const receipts=[]
const host3000=sdk.MultiHost.of(effects,'wallet-interface');const origin3000=await host3000.bindPort(3000,{protocol:'http'});receipts.push(await origin3000.export([sdk.createInterface(effects,{id:'wallet-interface',name:i18n('Wallet interface'),description:i18n('Wallet interface'),type:'ui',masked:false,schemeOverride:null,username:null,path:'',query:{}})]))
return receipts
})
