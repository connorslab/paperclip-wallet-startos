import json
from pathlib import Path
p=Path('/data/chain/client.cookie')
if not p.exists():raise SystemExit('Configure pruned=true and node RPC credentials, then start the app first')
user,password=p.read_text().strip().split(':',1)
print(json.dumps({'rpc_url':'http://127.0.0.1:18336','rpc_user':user,'rpc_password':password,'scope':'Only for onboarding inside this wallet app'}))
