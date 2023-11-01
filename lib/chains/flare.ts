import Wallet from '@/lib/wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class FlareSDK{
  chain   = 'Flare'
  symbol  = 'FLR'
  mainnet = {
    id: 14,
    explorer: 'https://flare-explorer.flare.net',
    rpcurl: 'https://songbird.towolabs.com/rpc',
    wssurl: ''
  }
  testnet = {
    id: 16,
    explorer: 'https://coston-explorer.flare.network',
    rpcurl: 'https://coston-api.flare.network/ext/bc/C/rpc',
    wssurl: ''
  }
  wallet = new Wallet()

  async connect(callback:Callback){
    console.log('FLR Connecting...')
    const result = await this.wallet.init(window)
    console.log('Metamask session:', result)
    if(result){
      const address = result.address
      const network = (result.network =='mainnet' ? 'mainnet' : 'testnet')
      const chainid = (result.network =='mainnet' ? this.mainnet.id : this.testnet.id)
      const data = {
        wallet:   'metamask',
        address:  address,
        chain:    this.chain,
        chaindid: chainid,
        currency: this.symbol,
        network:  network,
        token:    '',
        topic:    ''
      }
      callback(data)
    }
  }

  sendPayment(){
    console.log('FLR Sending payment...')
  }

  mintNFT(){
    console.log('FLR Minting NFT...')
  }
}

const Flare = new FlareSDK()

export default Flare