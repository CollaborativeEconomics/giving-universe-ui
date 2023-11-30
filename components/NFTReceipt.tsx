import Image from 'next/image'
import { TimestampToDateString } from './ui/date-posted'
import money from '@/lib/utils/money'
import { ReceiptStatus } from './ui/receipt-status'
import { ClaimButton } from './ui/button'

const Status = {
  pending: 'Pending',
  minted: 'Minted',
  minting: 'Minting',
  failed: 'Failed',
}

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
  const receiptStatus = dummyProps.status.minting
  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-0">
          <div className="relative bg-white p-6 shadow-xl my-8 h-auto w-[50%] max-w-xl">
            <div className="border-dotted border-t-2 border-b-2 border-gray-300 p-2">
              <h3 className="text-3xl font-semibold uppercase text-center text-gray-500">
                NFT Receipt
              </h3>
            </div>
            <div className="relative my-4 w-full h-48">
              <Image
                src={dummyProps.image}
                alt="IMG BG"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
            <ReceiptStatus status={receiptStatus} />

            <div className="p-2">
              <p className="text-sm font-bold text-gray-500">
                {dummyProps.organization.name}
              </p>
              <p className="text-sm whitespace-pre text-gray-500">
                EIN: {dummyProps.organization.ein}
                <br />
                {dummyProps.organization.address}
              </p>
              <TimestampToDateString
                className="pt-2 text-sm font-bold text-gray-500"
                timestamp={dummyProps.date}
              />
              <div className="flex flex-row justify-between items-center pt-2">
                <p className="text-sm font-bold whitespace-nowrap text-gray-500">
                  Donation amount
                </p>
                <div className="flex border-dotted border-t-2 border-gray-300 w-full"></div>
                <p className="text-sm font-bold whitespace-nowrap text-gray-500">
                  {dummyProps.amount} {dummyProps.ticker[0]}*
                </p>
              </div>
              <p className="pt-2 text-sm text-gray-500">
                *{dummyProps.ticker[0]} is a publicy traded crypto-currency with
                a direct monetary value
              </p>
              <div className="flex flex-row justify-between items-center pt-6">
                <p className="text-sm font-bold whitespace-nowrap text-gray-500">
                  Monetary Value*
                </p>
                <div className="flex border-dotted border-t-2 border-gray-300 w-full"></div>
                <p className="text-sm font-bold whitespace-nowrap text-gray-500">
                  ${money(dummyProps.amountFiat)} {dummyProps.fiatCurrencyCode}
                </p>
              </div>
              <p className="text-sm whitespace-nowrap text-gray-500 pt-2">
                *At the time of transaction
              </p>

              <div className="border-dotted border-t-2 border-b-2 border-gray-300 mt-6 py-2">
                <div className="flex flex-row justify-between">
                  <p className="text-sm font-bold whitespace-nowrap text-gray-500">
                    Donated By
                  </p>
                  <p className="text-sm font-bold whitespace-nowrap text-gray-500">
                    {dummyProps.donor.name}
                  </p>
                </div>
              </div>
              <p className="text-sm text-center text-gray-500 pt-4">
                No goods or services were provided in exchange for this
                contribution. Heifer International is a tax-exempt 501(c)(3)
                organization.
              </p>
              <ClaimButton status={receiptStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Status }
