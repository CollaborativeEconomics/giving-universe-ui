import Wallet from '../wallets/lobster'

type Dictionary = { [key: string]: any }
type Callback = (data: Dictionary) => void

class StellarSDK {
  chain = 'Stellar'
  symbol = 'XLM'
  logo = '/xlm-logo.png'
  wallet = new Wallet()
  rpcurl = ''
  wssurl = ''

  async connect(callback: Callback) {
    console.log('XLM Connecting...')
    const result = await this.wallet.login()
    console.log('Lobster session:', result)
    if (result) {
      const address = result.account
      const network = result.network == 'pubnet' ? 'mainnet' : 'testnet'
      const topic = result.topic
      const data = {
        wallet: 'lobstr',
        address: address,
        chain: this.chain,
        chaindid: '',
        currency: this.symbol,
        network: network,
        token: '',
        topic: topic,
      }
      callback(data)
    }
  }

  sendPayment() {
    console.log('XLM Sending payment...')
  }

  mintNFT() {
    console.log('XLM Minting NFT...')
  }
}

const Stellar = new StellarSDK()

export default Stellar
