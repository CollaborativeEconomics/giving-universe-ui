'use client'

// CLIENT LIBS
import Avalanche    from './avalanche'
import Binance      from './binance'
import Celo         from './celo'
import EOS          from './eos'
import Ethereum     from './ethereum'
import EthereumUSDC from './ethereum-usdc'
import EthereumUSDT from './ethereum-usdt'
import Filecoin     from './filecoin'
import Flare        from './flare'
import Optimism     from './optimism'
import Polygon      from './polygon'
import PublicGoods  from './publicgoods'
import Ripple       from './ripple'
import Stellar      from './stellar'
import Xinfin       from './xinfin'


const Chains = {
  'Avalanche':    Avalanche,
  'Binance':      Binance,
  'Celo':         Celo,
  'EOS':          EOS,
  'Ethereum':     Ethereum,
  'EthereumUSDC': EthereumUSDC,
  'EthereumUSDT': EthereumUSDT,
  'Filecoin':     Filecoin,
  'Flare':        Flare,
  'Optimism':     Optimism,
  'Polygon':      Polygon,
  'PublicGoods':  PublicGoods,
  'Stellar':      Stellar,
  'XinFin':       Xinfin,
  'XRPL':         Ripple
}

export default Chains