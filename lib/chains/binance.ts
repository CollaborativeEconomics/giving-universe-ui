import Wallet from '../wallets/metamask'

type Dictionary = { [key: string]: any }
type Callback = (data: Dictionary) => void

class BinanceSDK {
  chain = 'Binance'
  symbol = 'BNB'
  logo = '/bnb-logo.png'
  mainnet = {
    id: 56,
    explorer: 'https://bscscan.com',
    rpcurl: 'https://bsc-dataseed.binance.org',
    wssurl: '',
  }
  testnet = {
    id: 97,
    explorer: 'https://testnet.bscscan.com',
    rpcurl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    wssurl: '',
  }
  wallet = new Wallet()

  async connect(callback: Callback) {
    console.log('BNB Connecting...')
    const result = await this.wallet.init(window)
    console.log('Metamask session:', result)
    if (result) {
      const address = result.address
      const network = result.network == 'bsc-mainnet' ? 'mainnet' : 'testnet'
      const chainid =
        result.network == 'bsc-mainnet' ? this.mainnet.id : this.testnet.id
      const data = {
        wallet: 'metamask',
        address: address,
        chain: this.chain,
        chaindid: chainid,
        currency: this.symbol,
        network: network,
        token: '',
        topic: '',
      }
      callback(data)
    }
  }

  sendPayment() {
    console.log('BNB Sending payment...')
  }

  mintNFT() {
    console.log('BNB Minting NFT...')
  }
}

const Binance = new BinanceSDK()

export default Binance
