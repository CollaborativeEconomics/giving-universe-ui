'use client'

import { ModalText } from './ui/modal'
import { Checkbox, Input, InputWithContent, Select, Switch } from './ui/input'
import { Button } from './ui/button'
import { Chains, Wallets, Dictionary } from '@/lib/chains/apis'
import { useRef, useState } from 'react'

export default function NFTReceipt({ ...props }) {
  const chains = Object.values(Chains).map((chain) => {
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

  const [valueBasis, setValue] = useState(false)
  const [currentChain, setCurrentChain] = useState(chains[0])
  const [currentWallet, setCurrentWallet] = useState(wallets[0])
  const amountInputRef = useRef(null)

  console.log(currentChain)

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0">
          <div className="relative bg-white p-6 shadow-xl my-8 h-auto w-[50%] max-w-xl rounded-md dark:bg-slate-500">
            <div className="pb-4">
              <ModalText className="pb-2" text="Currency" />
              <Select
                options={chains}
                currentOption={currentChain}
                handleChange={(chain: {
                  value: string
                  image: string
                  symbol: string
                }) => setCurrentChain(chain)}
              />
            </div>
            <div className="pb-4">
              <ModalText className="pb-2" text="Wallet" />
              <Select
                options={wallets}
                currentOption={currentWallet}
                handleChange={(wallet: { value: string; image: string }) =>
                  setCurrentWallet(wallet)
                }
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
                        valueBasis={valueBasis}
                        handleToggle={() => {
                          setValue(!valueBasis)
                        }}
                      />
                      <ModalText
                        className="my-auto"
                        text={currentChain.symbol}
                      />
                    </div>
                  </div>
                  <div className="my-auto">
                    <InputWithContent
                      className="text-right"
                      type="text"
                      id="amount"
                      text={valueBasis ? '| ' + currentChain.symbol : '| USD'}
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
            <Checkbox
              text="I'd like to receive an email receipt"
              id="email-receipt"
            />
            <Checkbox
              text="I'd like to receive an NFT receipt"
              id="nft-receipt"
              className="pb-4"
            />
            <div className="flex flex-col pt-4 border-solid border-t-2 border-gray-300 w-full">
              <div className="inline-flex justify-center py-2">
                <Button className="mx-6 w-[250px] h-[50px] bg-blue-600 text-white text-lg outline outline-slate-300 outline-1">
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
