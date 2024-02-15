'use client'

// CLIENT LIBS
import Arbitrum     from './arbitrum'
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
import XRPLClient   from '../Ripple/Ripple.client'
import AvalancheClient from '../Avalanche/Avalanche.client'


const Chains: Record<string, any> = {
  'Arbitrum':     Arbitrum,
  'Avalanche':    AvalancheClient,
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
  'XRPL':         XRPLClient
}

export default Chains