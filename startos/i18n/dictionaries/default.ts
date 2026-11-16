export const DEFAULT_LANG = 'en_US'
const dict = {
  'Web Interface': 0,
  'The web interface is ready': 1,
  'The web interface is not ready': 2,
  'Authenticated Paperclip wallet': 3,
  'Show wallet access token': 4,
  'Retrieve the private token for the wallet interface.': 5,
  'This token grants spending access. Keep it private.': 6,
  'Wallet access': 7,
  'Paste this token into the wallet. Do not share it.': 8,
  'Access token': 9,
  'Node connection': 10,
  'Reuse the installed XBT node or enter RPC settings in the wallet.': 11,
  'This selects a connection for new wallets. Existing wallet settings are preserved.': 12,
  'Jars node connection': 13,
  'The restricted Jars RPC listener is ready': 14,
  'The Jars RPC listener is not ready': 15,
  'Jars wallet': 16,
  'The local Jars HTTPS listener is ready': 17,
  'The local Jars HTTPS listener is not ready': 18,
  'Run a separate JoinBlaket wallet inside Paperclip. Its keys and backups stay separate from your main wallet.': 19,
  'Enable the bundled JoinBlaket runtime for this test candidate.': 20,
  'Changing this setting restarts Paperclip. Finish active payments first. Disabling Jars keeps its wallet files and recovery records. This test candidate has not passed host backup/restore or mobile pairing acceptance.': 21,
} as const
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
