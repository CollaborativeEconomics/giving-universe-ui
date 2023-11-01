import Wallet from 'wallets/metamask'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class PolygonSDK{
  chain   = 'Polygon'
  symbol  = 'MATIC'
  mainnet = {
    id: 137,
    explorer: 'https://polygonscan.com',
    rpcurl: 'https://polygon-rpc.com',
    wssurl: ''
  }
  testnet = {
    id: 80001,
    explorer: 'https://mumbai.polygonscan.com',
    rpcurl: 'https://matic-mumbai.chainstacklabs.com',
    wssurl: ''
  }
  wallet = new Wallet()

  async connect(callback:Callback){
    console.log('MATIC Connecting...')
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
    console.log('MATIC Sending payment...')
  }

  mintNFT(){
    console.log('MATIC Minting NFT...')
  }
}

const Polygon = new PolygonSDK()

export default Polygon