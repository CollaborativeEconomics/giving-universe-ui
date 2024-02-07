'use client'
import Link from 'next/link'
import { getProviders, signIn } from "next-auth/react"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ButtonChain  from '@/components/ButtonChain'
import ButtonWallet from '@/components/ButtonWallet'
import Chains from '@/lib/chains/client/apis'

export default async function Signin(props: any) {
  //console.log('PROPS', props)
  //const query = props?.searchParams?.query || ''
  //console.log('SIGNIN', query)
  const url = '/' // TODO: get from auth/props ?

  function login(chainName:any){
    console.log('LOGIN', chainName)
    const chain = Chains[chainName]
    chain.connect(async (data:any) => {
      console.log('SignIn', data)
      console.log('RetUrl', url)
      const address  = data?.address  || ''
      const chainid  = data?.chainid  || ''
      const network  = data?.network  || ''
      const currency = data?.currency || ''
      //await signIn(chainName, {address, chainName, chainid, network, currency})
      await signIn(chainName, {callbackUrl: url, address, chainName, chainid, network, currency})
    })
  }

  return (
    <main className="flex w-[720px] min-h-screen flex-col items-stretch container py-24">
      <div className="border rounded-lg white mt-12">
        <div className="flex flex-1 flex-col items-stretch">
          <div className="border-b">
            <h2 className="text-left text-base my-4 px-8">Log in with your blockchain wallet</h2>
          </div>
          <div className="grid grid-cols-5 gap-2 px-4 py-8">
            <ButtonChain text="Arbitrum"     icon="arbitrum.png"    onClick={()=>{login('Arbitrum')}} />
            <ButtonChain text="Avalanche"    icon="avalanche.png"   onClick={()=>{login('Avalanche')}} />
            <ButtonChain text="Base"         icon="base.png"        onClick={()=>{login('Base')}} />
            <ButtonChain text="Celo"         icon="celo.png"        onClick={()=>{login('Celo')}} />
            <ButtonChain text="Flare"        icon="flare.png"       onClick={()=>{login('Flare')}} />
            <ButtonChain text="Optimism"     icon="optimism.png"    onClick={()=>{login('Optimism')}} />
            <ButtonChain text="Polygon"      icon="polygon.png"     onClick={()=>{login('Polygon')}} />
            <ButtonChain text="Stellar"      icon="stellar.png"     onClick={()=>{login('Stellar')}} />
            <ButtonChain text="XinFin"       icon="xinfin.png"      onClick={()=>{login('XinFin')}} />
            <ButtonChain text="XRPL"         icon="xrpl.png"        onClick={()=>{login('XRPL')}} />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-stretch">
          <div className="border-t">
            <h2 className="text-left text-base mt-8 px-8">Coming soon</h2>
          </div>
          <div className="grid grid-cols-5 gap-2 px-4 py-8 opacity-30 pointer-events-none">
            <ButtonChain text="Binance"      icon="binance.png"     />
            <ButtonChain text="EOS"          icon="eos.png"         />
            <ButtonChain text="Ethereum"     icon="ethereum.png"    />
            <ButtonChain text="Filecoin"     icon="filecoin.png"    />
            <ButtonChain text="Starknet"     icon="starknet.png"    />
            <ButtonChain text="USDC"         icon="usdc.png"        />
            <ButtonChain text="USDT"         icon="usdt.png"        />
          </div>
        </div>
        <div className="flex flex-col text-base">
          <div className="border-t">
            <h2 className="text-left text-base mt-8 px-8">Download our featured wallets</h2>
          </div>
          <div className="grid grid-cols-5 gap-2 px-4 py-8">
            <ButtonWallet text="Coinbase"    icon="coinbase.png"   href="https://chromewebstore.google.com/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad" />
            <ButtonWallet text="Freighter"   icon="freighter.png"  href="https://freighter.app" />
            <ButtonWallet text="Metamask"    icon="metamask.png"   href="https://metamask.io"   />
            <ButtonWallet text="Xaman"       icon="xaman.png"      href="https://xumm.app"      />
          </div>
        </div>
      </div>
    </main>
  )
}
