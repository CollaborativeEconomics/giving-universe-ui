import Wallet from '@/lib/wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class EOSSDK{
  chain    = 'EOS'
  symbol   = 'ETH'
  network  = process.env.NEXT_PUBLIC_EOS_NETWORK
  provider = null
  mainnet  = {
    id: 17777,
    name: 'EOS Mainnet',
    symbol: 'EOS',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://explorer.evm.eosnetwork.com',
    rpcurl: 'https://api.evm.eosnetwork.com',
    wssurl: ''
  }
  testnet = {
    id: 15557,
    name: 'EOS Testnet Goerli',
    symbol: 'EOS',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://explorer.testnet.evm.eosnetwork.com',
    rpcurl: 'https://api.testnet.evm.eosnetwork.com',
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

const EOS = new EOSSDK()

export default EOS