import Binance from '@/lib/chains/binance'
import Celo    from '@/lib/chains/celo'
import Flare   from '@/lib/chains/flare'
import Polygon from '@/lib/chains/polygon'
import Ripple  from '@/lib/chains/ripple'
import Stellar from '@/lib/chains/stellar'
import Xinfin  from '@/lib/chains/xinfin'

type Dictionary = { [key:string]:any }

export function getChainName(chain:string){
  const chains:Dictionary = {'bnb':'Binance', 'xlm':'Stellar', 'xrp':'XRPL'}
  const name = chains[chain] || 'Unchained'
  return name
}

export function getChainWallet(chain:string){
  const wallets:Dictionary = {'bnb':'Metamask', 'xlm':'Lobstr', 'xrp':'Xumm'}
  const name = wallets[chain] || 'None'
  return name
}


const Chains = {
  bnb:   Binance,
  celo:  Celo,
  flr:   Flare,
  matic: Polygon,
  xdc:   Xinfin,
  xlm:   Stellar,
  xrp:   Ripple
}


export default Chains