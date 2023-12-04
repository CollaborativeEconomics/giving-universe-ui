'use client'

import { ModalText } from './ui/modal'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Chains, Wallets, Dictionary } from '@/lib/chains/apis'
import { useRef, useState } from 'react'
import { InputWithContent } from './ui/input-with-content'
import { Switch } from './ui/switch'
import { DonationFormSelect } from './donationFormSelect'
import { CheckboxWithText } from './ui/checkbox'

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

  const wallets = Object.values(Wallets).map((wallet: Dictionary) => {
    return {
      value: wallet.name,
      image: wallet.image || '/test.png',
    }
  })

  const [showUSD, toggleShowUSD] = useState(false)
  const [currentChain, setCurrentChain] = useState(chains[0].value)
  const [currentWallet, setCurrentWallet] = useState(wallets[0])
  const amountInputRef = useRef(null)
  console.log(currentChain)
  console.log(chainLookup)
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0">
          <div className="relative bg-white p-6 shadow-xl my-8 h-auto w-[50%] max-w-xl rounded-md dark:bg-slate-500">
            <div className="pb-4">
              <ModalText className="pb-2" text="Currency" />
              <DonationFormSelect
                options={chains}
                currentOption={currentChain.symbol}
                handleChange={(chain: {
                  value: string
                  image: string
                  symbol: string
                }) => setCurrentChain(chain)}
                placeHolderText="...select a cryptocurrency"
              />
            </div>
            <div className="pb-4">
              <ModalText className="pb-2" text="Wallet" />
              <DonationFormSelect
                options={wallets}
                currentOption={currentWallet}
                handleChange={(wallet: { value: string; image: string }) =>
                  setCurrentWallet(wallet)
                }
                placeHolderText="...select a cryptowallet"
              />
            </div>
            <div className="py-4">
              <div className="flex flex-wrap border-solid border-y-2 border-gray-300 w-full">
                <div className="py-4 w-full mb-2">
                  <div className="flex flex-row justify-between">
                    <div className="my-auto">
                      <ModalText className="pb-2" text="Amount" />{' '}
                    </div>
                    <div className="flex flex-wrap">
                      <ModalText className="my-auto" text="USD" />
                      <Switch
                        id="value_basis"
                        valueBasis={showUSD}
                        handleToggle={() => {
                          toggleShowUSD(!showUSD)
                        }}
                      />
                      <ModalText
                        className="my-auto"
                        text={chainLookup[currentChain].symbol}
                      />
                    </div>
                  </div>
                  <div className="my-auto">
                    <InputWithContent
                      className="text-right"
                      type="text"
                      id="amount"
                      text={
                        showUSD
                          ? '| ' + chainLookup[currentChain].symbol
                          : '| USD'
                      }
                      divRef={amountInputRef}
                    />
                  </div>
                </div>
              </div>
            </div>
            <ModalText className="pb-2" text="Name (optional)" />
            <Input type="text" className="mb-4" id="name" />
            <ModalText className="pb-2" text="Email address (optional)" />
            <Input type="text" className="mb-4" id="email" />
            <CheckboxWithText text="I'd like to receive an emailed receipt" />
            <CheckboxWithText
              className="pb-4"
              text="I'd like to receive an NFT receipt"
            />
            <div className="flex flex-col pt-4 border-solid border-t-2 border-gray-300 w-full">
              <div className="inline-flex justify-center py-2">
                <Button className="mx-6 w-[250px] h-[50px] bg-blue-600 text-white text-lg outline outline-slate-300 outline-1 hover:bg-blue-700 hover:shadow-inner">
                  Donate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
