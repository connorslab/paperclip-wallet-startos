import os,base64,json,secrets
from pathlib import Path
from common import config,write,verify_chain
os.umask(0o077);c=config('wallet')
if c.get('pruned',False):
    verify_chain(c)
    chain=Path('/data/chain');chain.mkdir(exist_ok=True,mode=0o700)
    write(chain/'backend.json',json.dumps({'network':'main' if c['network']=='bitcoin' else 'regtest','rpc_url':c['rpc_url']}))
    write(chain/'backend.cookie',c['rpc_user']+':'+c['rpc_password'])
    if not (chain/'client.cookie').exists():write(chain/'client.cookie','paperclip:'+secrets.token_hex(32))
root=Path('/data/wallet');root.mkdir(exist_ok=True,mode=0o700)
token=os.environ.pop('STARTOS_TOKEN')
write(root/'auth_token',base64.urlsafe_b64encode(b'\0'+bytes.fromhex(token)).decode().rstrip('='))
os.environ.update(BARKD_DATADIR=str(root),BARKD_BIND_HOST='0.0.0.0',BARKD_BIND_PORT='3000',BARKD_UI_DEFAULT_ARK_SERVER=c['asp_url'],PAPERCLIP_XBT_MAINNET='1')
os.execvp('python3',['python3','/usr/local/lib/paperclip/managed-chain.py','run'])
