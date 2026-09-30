export const DEFAULT_LANG = 'en_US'
const dict = {
  "Web Interface": 0,
  "The web interface is ready": 1,
  "The web interface is not ready": 2,
  "Authenticated Paperclip wallet": 3,
  "Show wallet access token": 4,
  "Retrieve the private token for the wallet interface.": 5,
  "This token grants spending access. Keep it private.": 6,
  "Wallet access": 7,
  "Paste this token into the wallet. Do not share it.": 8,
  "Access token": 9
} as const
export type I18nKey = keyof typeof dict
export type LangDict = Record<(typeof dict)[I18nKey], string>
export default dict
