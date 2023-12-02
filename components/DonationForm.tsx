import { ModalText } from './ui/modal'
import { Checkbox, Input, Select } from './ui/input'
import { Button } from './ui/button'
import Chains from '@/lib/chains/apis'

const Status = {
  pending: 'Pending',
  minted: 'Minted',
  minting: 'Minting',
  failed: 'Failed',
}

const currencies = [
  {
    value: 'a',
    image:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig04.deviantart.net%2F2c94%2Ff%2F2015%2F125%2Fb%2F1%2Fcandy_the_cat___50x50_icon_by_dahooplerzman-d8sc0bt.png&f=1&nofb=1&ipt=4bc7a9de2fe9ee963c2a86fc77bda31143278d23ee7dafc12b9cbe81d725863c&ipo=images',
  },
  {
    value: 'b',
    image:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig04.deviantart.net%2F2c94%2Ff%2F2015%2F125%2Fb%2F1%2Fcandy_the_cat___50x50_icon_by_dahooplerzman-d8sc0bt.png&f=1&nofb=1&ipt=4bc7a9de2fe9ee963c2a86fc77bda31143278d23ee7dafc12b9cbe81d725863c&ipo=images',
  },
  {
    value: 'c',
    image:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig04.deviantart.net%2F2c94%2Ff%2F2015%2F125%2Fb%2F1%2Fcandy_the_cat___50x50_icon_by_dahooplerzman-d8sc0bt.png&f=1&nofb=1&ipt=4bc7a9de2fe9ee963c2a86fc77bda31143278d23ee7dafc12b9cbe81d725863c&ipo=images',
  },
]

const dummyProps = {
  status: Status,
  image:
    'https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75',
  organization: {
    name: 'Food not bombs',
    ein: '45-5yu62340u',
    address: '123 Fake St \nBuffalo, NZ 12345',
  },
  date: 123456, //timestamp
  amount: 233.6,
  ticker: ['XRP', 'XDC'],
  amountFiat: 112.3,
  fiatCurrencyCode: 'USD',
  donor: {
    name: 'Evan Hudson',
  },
}

export default function NFTReceipt({ ...props }) {
  const chains = Object.values(Chains).map((chain) => {
    chain.chain
  }) as unknown as string[]

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0">
          <div className="relative bg-white p-6 shadow-xl my-8 h-auto w-[50%] max-w-xl rounded-md">
            <div className="pb-4">
              <ModalText text="Currency" />
              <Select
                options={chains.map((chain) => {
                  return {
                    value: chain,
                  }
                })}
              />
            </div>
            <div className="pb-4">
              <ModalText text="Wallet" />
              <Select options={currencies} />
            </div>
            <div className="py-4">
              <div className="flex flex-wrap border-solid border-y-2 border-gray-300 w-full">
                <div className="py-4 w-full">
                  <ModalText text="Amount" />
                  <Input type="text" className="mb-2" id="amount" />
                </div>
              </div>
            </div>
            <ModalText text="Name (optional)" />
            <Input type="text" className="mb-4" id="name" />
            <ModalText text="Email address (optional)" />
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
