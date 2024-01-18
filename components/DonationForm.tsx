'use client'

import { Input } from './ui/input'
import { Button } from './ui/button'
import Chains from '@/lib/chains/client/apis'
import { Dictionary, getChainWallets } from '@/lib/chains/utils'
import { useRef, useState } from 'react'
import { InputWithContent } from './ui/input-with-content'
import { Switch } from './ui/switch'
import { DonationFormSelect } from './donationFormSelect'
import { CheckboxWithText } from './ui/checkbox'
import { Card } from './ui/card'
import { Separator } from './ui/separator'
import { Label } from './ui/label'

export default function NFTReceipt({ ...props }) {
  let chainLookup: Dictionary = {}
  const chains = Object.values(Chains).map((chain) => {
    chainLookup[chain.chain] = { image: chain.logo, symbol: chain.symbol }
    return {
      value: chain.chain,
      image: chain.logo || '/test.png',
      symbol: chain.symbol,
    }
  })

  const [showUSD, toggleShowUSD] = useState(false)
  const [currentChain, setCurrentChain] = useState(chains[0].value)
  const [wallets, setWallets] = useState(getChainWallets(chains[0].symbol))
  const [currentWallet, setCurrentWallet] = useState(wallets[0])
  const amountInputRef = useRef(null)

  return (
    <div className="flex min-h-full w-full">
      <Card className="py-6 w-full">
        <div className="px-6">
          <Label htmlFor="currency-select" className="mb-2">
            Currency
          </Label>
          <DonationFormSelect
            id="currency-select"
            className="mb-6"
            options={chains}
            currentOption={currentChain.symbol}
            handleChange={(chain: string) => {
              setCurrentChain(chain)
              setWallets(getChainWallets(chainLookup[chain].symbol))
            }}
            placeHolderText="...select a cryptocurrency"
          />
          <Label htmlFor="wallet-select" className="mb-2">
            Wallet
          </Label>
          <DonationFormSelect
            id="wallet-select"
            className="mb-6"
            options={wallets}
            currentOption={currentWallet ?? wallets[0]}
            handleChange={(wallet: { value: string; image: string }) =>
              setCurrentWallet(wallet)
            }
            placeHolderText="...select a cryptowallet"
          />
        </div>
        <Separator />
        <div className="px-6">
          <div className="w-full my-6">
            <div className="flex flex-row justify-between items-center mb-2">
              <Label>Amount</Label>{' '}
              <div className="flex flex-wrap">
                <Label htmlFor="show-usd-toggle">USD</Label>
                <Switch
                  id="show-usd-toggle"
                  valueBasis={showUSD}
                  handleToggle={() => {
                    toggleShowUSD(!showUSD)
                  }}
                />
                <Label>{chainLookup[currentChain].symbol}</Label>
              </div>
            </div>
            <div className="my-auto">
              <InputWithContent
                className="text-right"
                type="text"
                id="amount"
                text={
                  showUSD ? '| ' + chainLookup[currentChain].symbol : '| USD'
                }
                divRef={amountInputRef}
              />
            </div>
          </div>
          <Label htmlFor="name-input" className="mb-2">
            Name (optional)
          </Label>
          <Input type="text" className="mb-6" id="name-input" />
          <Label htmlFor="email-input" className="mb-2">
            Email address (optional)
          </Label>
          <Input type="text" className="mb-6" id="email-input" />
          <CheckboxWithText
            text="I'd like to receive an emailed receipt"
            className="mb-2"
          />
          <CheckboxWithText
            text="I'd like to receive an NFT receipt"
            className="mb-6"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center">
          <Button className="mt-6 mx-6 w-[250px] h-[50px] bg-blue-600 text-white text-lg outline outline-slate-300 outline-1 hover:bg-blue-700 hover:shadow-inner">
            Donate
          </Button>
        </div>
      </Card>
    </div>
  )
}
