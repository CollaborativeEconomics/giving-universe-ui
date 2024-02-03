// SERVER LIBS
import Avalanche   from './avalanche'
import Binance     from './binance'
import Celo        from './celo'
import EOS         from './eos'
import Ethereum    from './ethereum'
import Filecoin    from './filecoin'
import Flare       from './flare'
import Optimism    from './optimism'
import Polygon     from './polygon'
import Ripple      from './ripple'
import Stellar     from './stellar'
import Xinfin      from './xinfin'

const Chains = {
  'Avalanche':   Avalanche,
  'Binance':     Binance,
  'Celo':        Celo,
  'EOS':         EOS,
  'Ethereum':    Ethereum,
  'Filecoin':    Filecoin,
  'Flare':       Flare,
  'Optimism':    Optimism,
  'Polygon':     Polygon,
  'Stellar':     Stellar,
  'XinFin':      Xinfin,
  'XRPL':        Ripple
}

export default Chains