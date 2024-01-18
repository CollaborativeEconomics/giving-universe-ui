import Wallet from '@/lib/wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class ArbitrumSDK{
  chain    = 'Arbitrum'
  symbol   = 'ARB'
  logo     = 'arbitrum.png'
  network  = process.env.NEXT_PUBLIC_ARBITRUM_NETWORK
  provider = null
  mainnet  = {
    id: 42161,
    name: 'Arbitrum Mainnet',
    symbol: 'ETH',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://arbiscan.io',
    rpcurl: 'https://arb1.arbitrum.io/rpc',
    wssurl: ''
  }
  testnet = {
    id: 421614,
    name: 'Arbitrum Testnet', // Sepolia
    symbol: 'ETH',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://sepolia.arbiscan.io',
    rpcurl: 'https://sepolia-rollup.arbitrum.io/rpc',
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

  async sendToken(address, amount, token, contract, destinTag, callback){
    console.log(this.chain, 'Sending token...')
    this.connect(async (data) => {
      console.log('Pay connect', data)
      const result = await this.wallet.paytoken(address, amount, token, contract, destinTag)
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

const Arbitrum = new ArbitrumSDK()

export default Arbitrum