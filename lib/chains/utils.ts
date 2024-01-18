export type Dictionary = { [key:string]:any }

export function getChainName(currency:string){
  const chains:Dictionary = {
    'avax':  'Avalanche',
    'bnb':   'Binance',
    'celo':  'Celo',
    'eos':   'EOS',
    'eth':   'Ethereum',
    'fil':   'Filecoin',
    'flr':   'Flare',
    'matic': 'Polygon',
    'op':    'Optimism',
    'pgn':   'PublicGoods',
    'usdc':  'EthereumUSDC',
    'usdt':  'EthereumUSDT',
    'xdc':   'XinFin',
    'xlm':   'Stellar',
    'xrp':   'XRPL'
  }
  const name = chains[currency] || 'None'
  return name
}

export function getChainWallet(currency:string){
  const wallets:Dictionary = {
    'avax':  'Metamask',
    'bnb':   'Metamask',
    'celo':  'Metamask',
    'eos':   'Metamask',
    'eth':   'Metamask',
    'fil':   'Metamask',
    'flr':   'Metamask',
    'matic': 'Metamask',
    'op':    'Metamask',
    'pgn':   'Metamask',
    'usdc':  'Metamask',
    'usdt':  'Metamask',
    'xdc':   'Metamask',
    'xlm':   'Lobstr',
    'xrp':   'Xumm'
  }
  const name = wallets[currency] || 'None'
  return name
}

export function getChainNetwork(chain:string){
  const networks:Dictionary = {
    'Avalanche':    process.env.NEXT_PUBLIC_AVALANCHE_NETWORK,
    'Binance':      process.env.NEXT_PUBLIC_BINANCE_NETWORK,
    'Celo':         process.env.NEXT_PUBLIC_CELO_NETWORK,
    'EOS':          process.env.NEXT_PUBLIC_EOS_NETWORK,
    'Ethereum':     process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
    'EthereumUSDC': process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
    'EthereumUSDT': process.env.NEXT_PUBLIC_ETHEREUM_NETWORK,
    'Filecoin':     process.env.NEXT_PUBLIC_FILECOIN_NETWORK,
    'Flare':        process.env.NEXT_PUBLIC_FLARE_NETWORK,
    'Optimism':     process.env.NEXT_PUBLIC_OPTIMISM_NETWORK,
    'Polygon':      process.env.NEXT_PUBLIC_POLYGON_NETWORK,
    'PublicGoods':  process.env.NEXT_PUBLIC_PUBLICGOODS_NETWORK,
    'Stellar':      process.env.NEXT_PUBLIC_STELLAR_NETWORK,
    'XinFin':       process.env.NEXT_PUBLIC_XINFIN_NETWORK,
    'XRPL':         process.env.NEXT_PUBLIC_XRPL_NETWORK
  }
  const name = networks[chain] || 'testnet'
  return name
}

// Temporarily added, will be removed later on

const wallets: Dictionary = {
  metamask: { value: 'Metamask', image: '/bnb-wallet-logo.png' },
  lobstr: { value: 'Lobstr', image: '/xlm-wallet-logo.png' },
  xumm: { value: 'Xumm', image: '/xrp-wallet-logo.png' },
}

const chainWallets: Dictionary = {
  bnb: [wallets['metamask']],
  xlm: [wallets['lobstr']],
  xrp: [wallets['xumm']],
}

export function getChainWallets(chain: string) {
  return chainWallets[chain.toLowerCase()] ?? []
}

export type { Dictionary }