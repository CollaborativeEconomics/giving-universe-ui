import Wallet from '@/lib/wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class EthereumUSDCSDK{
  chain    = 'EthereumUSDC'
  symbol   = 'USDC'
  logo     = 'usdc.png'
  contract = process.env.NEXT_PUBLIC_ETHEREUM_USDC_TOKEN_CONTRACT
  network  = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK
  provider = null
  mainnet  = {
    id: 1,
    name: 'Ethereum USDC Mainnet',
    symbol: 'USDC',
    decimals: 6,
    gasprice: '250000000',
    explorer: 'https://etherscan.io',
    rpcurl: 'https://ethereum.publicnode.com',
    wssurl: ''
  }
  testnet = {
    id: 5,
    name: 'Ethereum USDC Testnet', // Goerli
    symbol: 'USDC',
    decimals: 6,
    gasprice: '250000000',
    explorer: 'https://goerli.etherscan.io',
    rpcurl: 'https://ethereum-goerli.publicnode.com',
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
      console.log('Pay token', data)
      //const result = await this.wallet.payment(address, amount, destinTag)
      const result = await this.wallet.paytoken(address, amount, this.symbol, this.contract, destinTag)
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

const EthereumUSDC = new EthereumUSDCSDK()

export default EthereumUSDC