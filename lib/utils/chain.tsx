function coinFromChain(chain:string){
  return {
    'Avalanche':'avax',
    'Binance'  :'bnb',
    'Celo'     :'celo',
    'Ethereum' :'eth',
    'Flare'    :'flr',
    'Polygon'  :'matic',
    'Stellar'  :'xlm',
    'XRPL'     :'xrp',
    'XinFin'   :'xdc'
  }[chain] || ''
}

function chainFromCoin(coin:string){
  return {
    'avax' :'Avalanche',
    'bnb'  :'Binance',
    'celo' :'Celo',
    'eth'  :'Ethereum',
    'flr'  :'Flare',
    'matic':'Polygon',
    'xlm'  :'Stellar',
    'xrp'  :'XRPL',
    'xdc'  :'XinFin'
  }[coin] || ''
}

export {
  coinFromChain,
  chainFromCoin
}