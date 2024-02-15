'use client'

// CLIENT LIBS
<<<<<<< Updated upstream
import Arbitrum     from './arbitrum'
import Avalanche    from './avalanche'
import Base         from './base'
//import Binance      from './binance'
import Celo         from './celo'
//import EOS          from './eos'
//import Ethereum     from './ethereum'
//import EthereumUSDC from './ethereum-usdc'
//import EthereumUSDT from './ethereum-usdt'
//import Filecoin     from './filecoin'
import Flare        from './flare'
import Optimism     from './optimism'
import Polygon      from './polygon'
import Stellar      from './stellar'
import XinFin       from './xinfin'
import XRPL         from './xrpl'


const Chains: Record<string, any> = {
  'Arbitrum':     Arbitrum,
  'Avalanche':    Avalanche,
  'Base':         Base,
//  'Binance':      Binance,
  'Celo':         Celo,
//  'EOS':          EOS,
//  'Ethereum':     Ethereum,
//  'EthereumUSDC': EthereumUSDC,
//  'EthereumUSDT': EthereumUSDT,
//  'Filecoin':     Filecoin,
  'Flare':        Flare,
  'Optimism':     Optimism,
  'Polygon':      Polygon,
  'Stellar':      Stellar,
  'XinFin':       XinFin,
  'XRPL':         XRPL
=======
import AvalancheClient from '../Avalanche/Avalanche.client'
import Binance from './binance'
import Celo from './celo'
import EOS from './eos'
import Ethereum from './ethereum'
import EthereumUSDC from './ethereum-usdc'
import EthereumUSDT from './ethereum-usdt'
import Filecoin from './filecoin'
import Flare from './flare'
import Optimism from './optimism'
import Polygon from './polygon'
import PublicGoods from './publicgoods'
import RippleClient from '../Ripple/Ripple.client'
import Stellar from './stellar'
import Xinfin from './xinfin'


const Chains = {
  'Avalanche': AvalancheClient,
  'Binance': Binance,
  'Celo': Celo,
  'EOS': EOS,
  'Ethereum': Ethereum,
  'EthereumUSDC': EthereumUSDC,
  'EthereumUSDT': EthereumUSDT,
  'Filecoin': Filecoin,
  'Flare': Flare,
  'Optimism': Optimism,
  'Polygon': Polygon,
  'PublicGoods': PublicGoods,
  'Stellar': Stellar,
  'XinFin': Xinfin,
  'XRPL': RippleClient
>>>>>>> Stashed changes
}

export default Chains