import { Xumm } from 'xumm'
import type { ResolvedFlow } from 'xumm-oauth2-pkce'

type Dictionary = { [key: string]: any }
type Callback = (data: Dictionary) => void
type IError = (error: Error) => void
type State = ResolvedFlow | Error | undefined

const apikey = process.env.NEXT_PUBLIC_XUMM_API_KEY || ''
const secret = process.env.XUMM_API_SECRET || ''

class RippleSDK {
  chain = 'XRPL'
  symbol = 'XRP'
  logo = 'xrp-logo.png'
  wallet = new Xumm(apikey, secret)
  rpcurl = ''
  wssurl = ''

  async connect(callback: Callback) {
    console.log('XRP Connecting...')
    this.wallet
      .authorize()
      .then((state) => {
        console.log('Xumm Authorized', state)
        if (!state) {
          console.log('Error: no state')
          return
        }
        if ('me' in state) {
          const flow = state
          const user = state.me
          const address = user.account
          //const network = user.networkType.toLowerCase()
          const network = 'testnet'
          const token = flow.jwt
          const data = {
            wallet: 'xumm',
            address: address,
            chain: this.chain,
            chaindid: '',
            currency: this.symbol,
            network: network,
            token: token,
            topic: '',
          }
          callback(data)
        } else {
          console.log('Error', state)
          return
        }
      })
      .catch((ex) => {
        console.log('Error', ex)
      })
  }

  sendPayment() {
    console.log('XRP Sending payment...')
  }

  mintNFT() {
    console.log('XRP Minting NFT...')
  }
}

const Ripple = new RippleSDK()

export default Ripple
