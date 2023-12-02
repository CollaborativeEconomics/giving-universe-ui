import Wallet from '../wallets/metamask'

type Dictionary = { [key: string]: any }
type Callback = (data: Dictionary) => void

class CeloSDK {
  chain = 'Celo'
  symbol = 'CELO'
  mainnet = {
    id: 42220,
    explorer: 'https://explorer.celo.org',
    rpcurl: 'https://forno.celo.org',
    wssurl: '',
  }
  testnet = {
    id: 44787,
    explorer: 'https://alfajores-blockscout.celo-testnet.org',
    rpcurl: 'https://alfajores-forno.celo-testnet.org',
    wssurl: '',
  }
  wallet = new Wallet()

  async connect(callback: Callback) {
    console.log('CELO Connecting...')
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
    console.log('CELO Sending payment...')
  }

  mintNFT() {
    console.log('CELO Minting NFT...')
  }
}

const Celo = new CeloSDK()

export default Celo
