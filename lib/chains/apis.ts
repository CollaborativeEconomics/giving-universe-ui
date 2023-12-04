import Binance from '@/lib/chains/binance'
import Celo from '@/lib/chains/celo'
import Flare from '@/lib/chains/flare'
import Polygon from '@/lib/chains/polygon'
import Ripple from '@/lib/chains/ripple'
import Stellar from '@/lib/chains/stellar'
import Xinfin from '@/lib/chains/xinfin'

type Dictionary = { [key: string]: any }

export function getChainName(chain: string) {
  const chains: Dictionary = { bnb: 'Binance', xlm: 'Stellar', xrp: 'XRPL' }
  const name = chains[chain] || 'Unchained'
  return name
}

export function getChainWallets(chain: string) {
  const result = Wallets[chain.toLowerCase()]
  return result ? result : []
}

const Wallets: Dictionary = {
  bnb: [{ value: 'Metamask', image: '/bnb-wallet-logo.png' }],
  xlm: [{ value: 'Lobstr', image: '/xlm-wallet-logo.png' }],
  xrp: [{ value: 'Xumm', image: '/xrp-wallet-logo.png' }],
}

const Chains: Dictionary = {
  bnb: Binance,
  celo: Celo,
  flr: Flare,
  matic: Polygon,
  xdc: Xinfin,
  xlm: Stellar,
  xrp: Ripple,
}

export { Chains, Wallets }
export type { Dictionary }
