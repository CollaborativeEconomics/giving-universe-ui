import Web3 from 'web3'
import Abi721 from 'chains/contracts/erc721-abi.json'

type Dictionary = { [key:string]:any }
type Callback = (data:Dictionary)=>void

class OptimismServer {
  chain    = 'Optimism'
  symbol   = 'OP'
  network  = process.env.NEXT_PUBLIC_OPTIMISM_NETWORK
  provider = null
  mainnet  = {
    id: 1,
    name: 'Optimism Mainnet',
    symbol: 'OP',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://etherscan.io',
    rpcurl: 'https://ethereum.publicnode.com',
    wssurl: ''
  }
  testnet = {
    id: 5,
    name: 'Optimism Testnet', // sepolia
    symbol: 'OP',
    decimals: 18,
    gasprice: '250000000',
    explorer: 'https://goerli.etherscan.io',
    rpcurl: 'https://ethereum-goerli.publicnode.com',
    wssurl: ''
  }
  web3 = null

  constructor(){
    this.provider = this.network=='mainnet' ? this.mainnet : this.testnet
    this.web3 = new Web3(this.provider.rpcurl)
  }

  toHex(str){
    return '0x'+parseInt(str).toString(16)
  }

  toWei(num){
    const wei = 10**this.provider.decimals
    return num * wei
  }

  fromWei(num){
    const wei = 10**this.provider.decimals
    return num / wei
  }

  strToHex(str) {
    if(!str){ return '' }
    return '0x'+Buffer.from(str.toString(), 'utf8').toString('hex')
  }

  hexToStr(hex, encoding:BufferEncoding='utf8') {
    if(!hex){ return '' }
    return Buffer.from(hex.substr(2), 'hex').toString(encoding)
  }

  async fetchLedger(method, params){
    let data = {id: '1', jsonrpc: '2.0', method, params}
    let body = JSON.stringify(data)
    let opt  = {method:'POST', headers:{'Content-Type':'application/json'}, body}
    try {
      let res = await fetch(this.provider.rpcurl, opt)
      let inf = await res.json()
      return inf?.result
    } catch(ex) {
      console.error(ex)
      return {error:ex.message}
    }
  }

  async sendPayment(address, amount, destinTag, callback){
    console.log('BNB Sending payment...')
    const value = this.toWei(amount)
    const secret = process.env.OPTIMISM_MINTER_WALLET_SEED
    //const source = process.env.OPTIMISM_MINTER_WALLET
    const acct = this.web3.eth.accounts.privateKeyToAccount(secret)
    const source = acct.address
    const nonce = await this.web3.eth.getTransactionCount(source, 'latest')
    const memo = this.strToHex(destinTag)
    const tx = {
      from: source, // minter wallet
      to: address,  // receiver
      value: value, // value in wei to send
      data: memo    // memo initiative id
    }
    console.log('TX', tx)
    const signed = await this.web3.eth.accounts.signTransaction(tx, secret)
    const result = await this.web3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log('RESULT', result)
    //const txHash = await this.fetchLedger({method: 'eth_sendTransaction', params: [tx]})
    //console.log({txHash});
  }

  async mintNFT(uri: string, address: string){
    console.log(this.chain, 'server minting NFT to', address, uri)
    const secret   = process.env.OPTIMISM_MINTER_WALLET_SEED
    const acct     = this.web3.eth.accounts.privateKeyToAccount(secret)
    const minter   = acct.address
    const contract = process.env.NEXT_PUBLIC_OPTIMISM_MINTER_CONTRACT
    const instance = new this.web3.eth.Contract(Abi721, contract)
    const noncex   = await this.web3.eth.getTransactionCount(minter, 'latest')
    const nonce    = parseInt(noncex)
    console.log('MINTER', minter)
    console.log('NONCE', nonce)
    const data = instance.methods.safeMint(address, uri).encodeABI()
    console.log('DATA', data)
    const gasPrice = await this.fetchLedger('eth_gasPrice', [])
    console.log('GAS', parseInt(gasPrice,16), gasPrice)
    const checkGas = await this.fetchLedger('eth_estimateGas', [{from:minter, to:contract, data}])
    console.log('EST', parseInt(checkGas,16), checkGas)
    const gas = { gasPrice: this.provider.gasprice, gasLimit: 275000 }

    const tx = {
      from: minter, // minter wallet
      to: contract, // contract address
      value: '0',   // this is the value in wei to send
      data: data,   // encoded method and params
      gas: gas.gasLimit,
      gasPrice: gas.gasPrice,
      nonce
    }
    console.log('TX', tx)

    const sign = await this.web3.eth.accounts.signTransaction(tx, secret)
    const info = await this.web3.eth.sendSignedTransaction(sign.rawTransaction)
    console.log('INFO', info)
    const hasLogs = info.logs.length>0
    let tokenNum = ''
    if(hasLogs){
      console.log('LOGS.0', JSON.stringify(info?.logs[0].topics,null,2))
      console.log('LOGS.1', JSON.stringify(info?.logs[1].topics,null,2))
      tokenNum = ' #'+parseInt(info.logs[0].topics[3], 16)
    }
    if(info.status==1){
      const tokenId = contract+tokenNum
      const result = {success:true, txid:info?.transactionHash, tokenId}
      console.log('RESULT', result)
      return result
    }
    return {success:false, error:'Something went wrong'}
  }

  async getTransactionInfo(txid){
    console.log('Get tx info', txid)
    const info = await this.fetchLedger('eth_getTransactionByHash', [txid])
    if(!info || info?.error){ return {success:false, error:'Error fetching tx info'} }
    const result = {
      success: true,
      account: info?.from,
      destination: info?.to,
      destinationTag: this.hexToStr(info?.input),
      amount: this.fromWei(info?.value)
    }
    return result
  }
}

const Optimism = new OptimismServer()

export default Optimism