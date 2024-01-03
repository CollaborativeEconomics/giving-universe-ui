import Wallet from '@/lib/wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class PublicGoodsSDK{
  chain    = 'PublicGoods'
  symbol   = 'PGN'
  network  = process.env.NEXT_PUBLIC_PUBLICGOODS_NETWORK
  provider = null
  mainnet  = {
    id: 424,
    name: 'PublicGoods Mainnet',
    symbol: 'PGN',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://explorer.publicgoods.network',
    rpcurl: 'https://rpc.publicgoods.network',
    wssurl: ''
  }
  testnet = {
    id: 58008,
    name: 'PublicGoods Testnet',
    symbol: 'PGN',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://explorer.sepolia.publicgoods.network',
    rpcurl: 'https://sepolia.publicgoods.network',
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

const PublicGoods = new PublicGoodsSDK()

export default PublicGoods