import * as StellarSdk from 'stellar-sdk'
import {Contract, Networks} from 'chains/contracts/nft721'

interface MintResponse {
  success?: boolean;
  error?:string|boolean;
  tokenId?:string;
}

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class StellarServer {
  chain    = 'Stellar'
  symbol   = 'XLM'
  network  = process.env.NEXT_PUBLIC_STELLAR_NETWORK
  provider = null
  mainnet  = {
    id: 0,
    name: 'Stellar Mainnet',
    symbol: 'XLM',
    decimals: 6,
    explorer: '',
    horizon: 'https://horizon.stellar.org',
    soroban: 'https://horizon-futurenet.stellar.org',
    phrase: 'Public Global Stellar Network ; September 2015',
    wssurl: ''
  }
  testnet  = {
    id: 0,
    name: 'Stellar Testnet',
    symbol: 'XLM',
    decimals: 6,
    explorer: '',
    horizon: 'https://horizon-testnet.stellar.org',
    soroban: 'https://soroban-testnet.stellar.org',
    phrase: 'Test SDF Network ; September 2015',
    wssurl: ''
  }
  futurenet  = {
    id: 0,
    name: 'Stellar Futurenet',
    symbol: 'XLM',
    decimals: 6,
    explorer: '',
    horizon: 'https://horizon-futurenet.stellar.org',
    soroban: 'https://rpc-futurenet.stellar.org',
    phrase: 'Test SDF Future Network ; October 2022',
    wssurl: ''
  }

  constructor(){
    this.provider = this.network=='mainnet' ? this.mainnet : this.testnet
  }

  toWei(num){
    const wei = 10**this.provider.decimals
    return num * wei
  }

  fromWei(num){
    const wei = 10**this.provider.decimals
    return num / wei
  }

  async fetchLedger(query){
    try {
      let url = this.provider.horizon + query
      console.log('FETCH', url)
      let options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      let result = await fetch(url, options)
      let data = await result.json()
      return data
    } catch (ex) {
      console.error(ex)
      return { error: ex.message }
    }
  }

  async sendPayment(address, amount, destinTag, callback){
    console.log(this.chain, 'Sending payment to', address, amount)
    console.log('Sending payment from server not allowed')
    return {error:'NOT ALLOWED FROM SERVER'}
  }

  async mintNFT(uri:string, adr:string){
    console.log(this.chain, 'minting NFT to', adr, uri)
    //const nettype = process.env.NEXT_PUBLIC_STELLAR_NETWORK
    const nettype = 'futurenet' // mint nft on futurenet only
    const network = nettype=='futurenet' ? Networks.futurenet : Networks.testnet
    console.log('NET', network)
    const contract = new Contract({...network})
    //console.log('CTR', contract.spec)
    const info = await contract.mint({to:adr})
    console.log('OK?', info?.success)
    console.log('TXID', info?.txid)
    console.log('TKID', info?.tokenId)
    if(!info?.success){
      return info
    }
    return info
  }
/*
  async mintNFT_OLD(uri: string, address:string):Promise<MintResponse>{
    console.log(this.chain, 'minting NFT to', address, uri)
    try {
      const server  = new StellarSdk.Server(this.provider.horizon)
      const minter  = StellarSdk.Keypair.fromSecret(process.env.STELLAR_MINTER_WALLET_SECRET) // GDDMY...
      const issuer  = minter.publicKey()
      const source  = await server.loadAccount(issuer)
      const myNFT   = new StellarSdk.Asset('GIVEXLM', issuer)
      //const phrase  = this.network=='mainnet' ? StellarSdk.Networks.PUBLIC : StellarSdk.Networks.TESTNET
      const phrase  = StellarSdk.Networks.FUTURENET
      const timeout = 300 // five minutes

      var mintTx = new StellarSdk.TransactionBuilder(source, {
        networkPassphrase: phrase,
        fee: StellarSdk.BASE_FEE
      })

      let mintOp = StellarSdk.Operation.payment({
        source: issuer,
        destination: address,
        asset: myNFT,
        amount: '1'
      })

      let mint = mintTx
        .addOperation(mintOp)
        //.addMemo(StellarSdk.Memo.text(uri))
        .setTimeout(timeout)
        .build()
      
      //console.log('Minting...')
      mint.sign(minter)
      let minted = await server.submitTransaction(mint)
      console.log('Minted', minted)
      if(minted?.successful){
        // StellarSDK interface from server.submitTransaction response without paging_token
        // Clone the result and get the paging_token from there
        const cloned = JSON.parse(JSON.stringify(minted))
        const opid = (BigInt(cloned?.paging_token || '0') + BigInt(1)).toString() // eslint-disable-line
        console.log('Txid', opid)
        return {success:true, tokenId:opid}
      } else {
        //console.log('Error', minted.response?.data?.extras?.result_codes)
        //return {success:false, error:'Error minting '+minted?.response?.data?.extras?.result_codes}
        //console.log('Error?', minted?.response?.data)
        console.log('Error?', minted)
        return {success:false, error:'Error minting NFT'}
      }
    } catch(ex) {
      console.error(ex)
      return {success:false, error:ex.message}
    }
  }
*/
  async getTransactionInfo(txid){
    console.log('Get tx info by txid', txid)
    let txInfo = await this.fetchLedger('/transactions/'+txid)
    if (!txInfo || 'error' in txInfo) {
      console.log('ERROR', 'Transaction not found:', txid)
      return { error: 'Transaction not found' }
    }
    if (!txInfo?.successful) {
      console.log('ERROR', 'Transaction not valid')
      return { error: 'Transaction not valid' }
    }
    console.log('TXINFO', txInfo)
    const tag = txInfo.memo?.indexOf(':')>0 ? txInfo.memo?.split(':')[1] : ''
    const opid = (BigInt(txInfo.paging_token)+BigInt(1)).toString()
    const opInfo = await this.fetchLedger('/operations/'+opid)
    const result = {
      success: true,
      account: txInfo.source_account,
      amount: opInfo?.amount,
      destination: opInfo?.to,
      destinationTag: tag
    }
    return result
  }
}

const Stellar = new StellarServer()

export default Stellar