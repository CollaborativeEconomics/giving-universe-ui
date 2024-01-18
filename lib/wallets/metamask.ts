import Web3 from 'web3'

export default class Wallet {
  MAINURL   = 'https://bsc-dataseed.binance.org' // MAINNET
  MAINEXP   = 'https://bscscan.com'
  TESTURL   = 'https://data-seed-prebsc-1-s1.binance.org:8545' // TESTNET
  TESTEXP   = 'https://testnet.bscscan.com'
  neturl    = this.TESTURL
  explorer  = this.TESTEXP
  network   = 'bsc-testnet'
  chainId   = '0x61'
  accounts?:[any]
  myaccount = ''
  metamask?:any = null
  web3?:any = null

  constructor(){
    //console.log('Wallet constructor')
  }

  async init(window:any) {
    //console.log('Wallet starting...')
    if (window.ethereum) {
      //console.log('window.ethereum')
      try {
        this.metamask = window.ethereum || null
        this.setListeners()
        this.accounts = await this.metamask?.enable()
        //console.log('Accounts', this.accounts)
        this.myaccount = this.accounts ? this.accounts[0] : ''
        //this.myaccount = this.metamask.selectedAddress
        this.setNetwork(window.ethereum.chainId)
        //this.loadWallet(window)
        return {network:this.network, address:this.myaccount}
      } catch(ex:any) {
        console.error('Error', ex.message)
        return {network:null, address:null}
      }
    } else {
      console.log('Metamask not available')
      return {network:null, address:null}
    }
  }

  isConnected(window:any){
    return window.ethereum.isConnected() && window.ethereum.selectedAddress
  }

  setListeners() {
    this.metamask.on('connect', (info:any)=>{
      console.log('> onConnect', info);
      this.setNetwork(info.chainId);
      //if(restore){
      //  restore(this.network, this.myaccount)
      //}
      //this.loadWallet();
    });
    this.metamask.on('disconnect', (info:any)=>{
      console.log('> onDisconnect', info)
      //
      console.log('Disconnected')
    });
    this.metamask.on('accountsChanged', (info:any)=>{
      console.log('> onAccounts', info)
      this.accounts = info;
      this.myaccount = info[0];
      console.log('My account', this.myaccount);
      //if(restore){
      //  restore(this.network, this.myaccount)
      //}
      //this.getBalance(this.myaccount);
    });
    this.metamask.on('chainChanged', (chainId:string)=>{
      console.log('> onChain', chainId)
      if(chainId==this.chainId) { console.log('Already on chain', chainId); return; }
      this.setNetwork(chainId)
      //if(restore){
      //  restore(this.network, this.myaccount)
      //}
      //this.loadWallet();
      //this.requestAccount();
      //this.getAccounts();
    })
    this.metamask.on('message', (info:any)=>{
      console.log('> onMessage', info)
    })
    console.log('Listeners set')
  }

  setNetwork(chainId:string) {
    console.log('SetNetwork', chainId)
    if(!chainId){ chainId = this.metamask.chainId; }
    const mainnet = (chainId == '0x38') // 0x61 testnet
    this.network  = mainnet ? 'bsc-mainnet' : 'bsc-testnet'
    this.neturl   = mainnet ? this.MAINURL : this.TESTURL
    this.explorer = mainnet ? this.MAINEXP : this.TESTEXP
    this.chainId  = chainId
    console.log('Network', this.network, this.chainId)
  }

  async loadWallet(window:any) {
    console.log('Loading wallet...', this.network);
    this.web3 = new Web3(this.neturl);
    //web3.eth.getChainId().then(id => { console.log('ChainId', id) })
    //console.log('WEB3', web3);
    console.log('VER', this.web3.version)

    if (window.ethereum) {
      //console.log('window.ethereum')
      if(this.metamask.isConnected()) { 
        console.log('Already connected to', this.metamask.chainId=='0x38'?'MAINNET':'TESTNET', this.metamask.chainId); 
        this.getAccounts();
        //this.getAddress(this.getBalance);
      } else {
        console.log('Connecting...')
        const accts = await this.metamask.enable()
        console.log('Enabled:', accts)
        this.getAccounts();
          //this.getAddress().then(adr=>{
          //  console.log('Passed1')
          //  this.getBalance(adr);
          //});
        //});
      }
    } else {
      console.log('Metamask not available')
    }
  }
/*
  // Metamask Events
  async onConnect(info) {
    console.log('onConnect', info);
    // info.chainId
    //this.setNetwork(info.chainId);
    //this.loadWallet();
  }

  async onDisconnect(info) {
    console.log('onDisconnect', info)
    //
    console.log('Disconnected')
  }

  async onAccounts(info) {
    console.log('onAccounts', info)
    this.accounts = info;
    this.myaccount = info[0];
    console.log('My account', this.myaccount);
    this.getBalance(this.myaccount);
  }

  async onChain(chainId) {
    console.log('onChain', chainId)
    if(chainId==this.chainId) { console.log('Already on chain', chainId); return; }
    this.setNetwork(chainId);
    //this.loadWallet();
    //this.requestAccount();
    //this.getAccounts();
  }

  async onMessage(info) {
    console.log('onMessage', info)
  }
*/
  /*
  function requestAccount() {
      this.metamask.request({ method: 'eth_requestAccounts' }).then(onAccounts)
      .catch(err => {
        if (err.code === 4001) {
          console.log('User rejected');
          console.log('Please connect to Metamask wallet');
        } else {
          console.error('Connection error', err);
        }
      });
  }
  */

  // Methods
  getAccountHex(acts:[any]) {
    for (var i = 0; i < acts.length; i++) {
      if(acts[i].type=='eth'){ return acts[i].address }
    }
    return null
  }

  async getAccounts() {
    console.log('Get accounts...')
    this.metamask.request({method: 'eth_requestAccounts'}).then((accts:any)=>{
      this.accounts = accts
      this.myaccount = accts[0]
      console.log('Accounts:', accts)
      console.log('MyAccount:', this.myaccount)
      //onReady(this.myaccount, this.network)
    }).catch((err:any) => { 
      console.log('Error: User rejected')
      console.error(err) 
      //onReady(null, 'User rejected connection'
    });
  }

  async getAddress(oncall:any) {
    console.log('Get address...')
    this.metamask.request({method: 'eth_requestAccounts'}).then((res:any)=>{
      console.log('Account', res)
      this.myaccount = res[0]
      //$('user-address').innerHTML = this.myaccount.substr(0,10)
      oncall(this.myaccount)
    }).catch((err:any) => { 
      console.log('Error: Wallet not connected')
      console.error(err) 
      //$('user-address').innerHTML = 'Not connected'
      //$('user-balance').innerHTML = '0.0000 BNB'
      oncall(null)
    });
  }

  async getBalance(adr:string) {
    console.log('Get balance...')
    const balance = await this.metamask.request({method:'eth_getBalance', params:['0x407d73d8a49eeb85d32cf465507dd71d507100c1','latest']})
    console.log('Balance:', balance)
    //web3.eth.getBalance(adr, (err,res) => {
    //  console.log('Balance', adr.substr(0,8), res);
    //  let bal = (parseInt(res)/10**18).toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 4, maximumFractionDigits: 4});
    //  //$('user-address').innerHTML = adr.substr(0,10); 
    //  //$('user-balance').innerHTML = bal+' BNB';
    //});
    return balance
  }

  async getGasPrice() {
    let gas = await this.metamask.request({method:'eth_gasPrice', params:[]})
    console.log('Average gas price:', gas)
    return gas
  }

  async callContract(provider:any, abi:any, address:string, method:string) {
    console.log('Call', address, method)
    let web = new Web3(provider);
    let ctr = new web.eth.Contract(abi, address);
    let gas = { gasPrice: 1000000000, gasLimit: 275000 };
    let res = ctr.methods[method].call(gas);
    console.log(res);
  }

  async payment(destin:string, amount:string){
    function hex(num:number) { return '0x'+(num).toString(16); }
    console.log(`Sending ${amount} BNB to ${destin}...`)
    const gasPrice = await this.getGasPrice() //hex(20000000000)
    const gas = hex(21000)
    const wei = hex(parseFloat(amount) * 10**18)
    const method = 'eth_sendTransaction'
    const params = [
      {
        from: this.myaccount,
        to: destin,
        value: wei,
        gasPrice,
        gas
      }
    ]
    console.log({params})
    try {
      const result = await this.metamask.request({method,params})
      console.log('TXID:', result)
      return {success:true, txid:result}
    } catch(ex:any) {
      console.error(ex)
      return {success:false, error:ex.message}
    }
  }
}

/*
function onWallet() {
  console.log('On wallet');
  if(this.metamask.isConnected()) {
    console.log('Logout');
    this.metamask.enable(); // ???
  } else {
    console.log('Enable');
    this.metamask.enable();
  }
}

async function calcGas(numx, web) {
  let gas = { gasPrice: 20000000000, gasLimit: 25000 };
  let prc = 20000000000;
  if(web){ prc = await web.eth.getGasPrice(); console.log('Gas Price', prc); }
  let est = parseInt(numx, 16);
  let lmt = parseInt(est * 1.15);
  gas.gasPrice = parseInt(prc);
  gas.gasLimit = lmt;
  console.log(gas);
  return gas;
}
*/

// END