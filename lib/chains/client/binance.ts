import Wallet from '@/lib/wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class BinanceSDK{
  chain    = 'Binance'
  symbol   = 'BNB'
  network  = process.env.NEXT_PUBLIC_BINANCE_NETWORK
  provider = null
  mainnet  = {
    id: 56,
    name: 'Binance Mainnet',
    symbol: 'BNB',
    decimals: 18,
    gasprice: '9000000000',
    explorer: 'https://bscscan.com',
    rpcurl: 'https://bsc-dataseed.binance.org',
    wssurl: ''
  }
  testnet = {
    id: 97,
    name: 'Binance Testnet',
    symbol: 'BNB',
    decimals: 18,
    gasprice: '9000000000',
    explorer: 'https://testnet.bscscan.com',
    rpcurl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    wssurl: ''
  }
  wallet = null

  constructor(){
    this.provider = this.network=='mainnet' ? this.mainnet : this.testnet
    this.wallet = new Wallet(this.provider)
  }

  toWei(num){
    const sats = 10**this.provider.decimals
    return num / sats
  }

  async connect(callback:Callback){
    console.log(this.chain, 'connecting...')
    const result = await this.wallet.init(window, this.provider)
    console.log('Metamask session:', result)
    if(result?.address){
      const data = {
        wallet:   'metamask',
        address:  result.address,
        chainid:  this.provider.id,
        chain:    this.chain,
        currency: this.provider.symbol,
        decimals: this.provider.decimals,
        network:  this.network,
        token:    '',
        topic:    ''
      }
      callback(data)
    }
  }

  async sendPayment(address, amount, destinTag, callback){
    console.log(this.chain, 'Sending payment...')
    this.connect(async (data) => {
      console.log('Pay connect', data)
      const result = await this.wallet.payment(address, amount, destinTag)
      callback(result)
    })
  }

  async mintNFT(uri: string){
    console.log(this.chain, 'Minting NFT...')
    console.log('Not implemented on the client')
  }

  async getTransactionInfo(txid){
    console.log('Get tx info by txid', txid)
    const info = await this.wallet.getTransactionInfo(txid)
    return info
  }
}

const Binance = new BinanceSDK()

export default Binance