import Wallet from '../wallets/metamask'

type Dictionary = { [key: string]: any }
type Callback = (data: Dictionary) => void

class XinfinSDK {
  chain = 'XinFin'
  symbol = 'XDC'
  logo = '/xdc-logo.png'
  mainnet = {
    id: 50,
    explorer: 'https://explorer.xinfin.network',
    rpcurl: 'https://rpc.xinfin.network',
    wssurl: '',
  }
  testnet = {
    id: 51,
    explorer: 'https://explorer.apothem.network',
    rpcurl: 'https://rpc.apothem.network',
    wssurl: '',
  }
  wallet = new Wallet()

  async connect(callback: Callback) {
    console.log('XDC Connecting...')
    const result = await this.wallet.init(window)
    console.log('Metamask session:', result)
    if (result) {
      const address = result.address
      const network = result.network == 'mainnet' ? 'mainnet' : 'testnet'
      const chainid =
        result.network == 'mainnet' ? this.mainnet.id : this.testnet.id
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
    console.log('XDC Sending payment...')
  }

  mintNFT() {
    console.log('XDC Minting NFT...')
  }
}

const Xinfin = new XinfinSDK()

export default Xinfin
