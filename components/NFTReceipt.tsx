import Image from 'next/image'
import { TimestampToDateString } from './ui/date-posted'
import money from '@/lib/utils/money'
import { ReceiptStatus } from './ui/receipt-status'
import { ClaimButton } from './ui/button'
import { NFTReceiptText } from './ui/NFTReceiptText'

const Status = {
  pending: 'Pending',
  minted: 'Minted',
  minting: 'Minting',
  failed: 'Failed',
}

export default function NFTReceipt({ ...props }) {
  return (
    <div className="flex min-h-full w-full">
      <div className="relative bg-white dark:bg-slate-500 p-6 shadow-xl my-4 h-auto">
        <div className="border-dotted border-t-2 border-b-2 border-gray-300 p-2">
          <h3 className="text-3xl font-semibold uppercase text-center text-gray-500 dark:text-white">
            NFT Receipt
          </h3>
        </div>
        <div className="relative my-4 w-full h-48">
          <Image
            src={props.data.image}
            alt="IMG BG"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <ReceiptStatus status={props.data.status} />

        <div className="p-2">
          <NFTReceiptText>{props.data.organization.name}</NFTReceiptText>
          <NFTReceiptText className="font-normal">
            EIN: {props.data.organization.ein}
          </NFTReceiptText>
          <NFTReceiptText className="font-normal whitespace-pre">
            {props.data.organization.address}
          </NFTReceiptText>
          <TimestampToDateString
            className="pt-2 text-sm font-bold text-gray-500 dark:text-white"
            timestamp={props.data.date}
          />
          <div className="flex flex-row justify-between items-center pt-2">
            <NFTReceiptText>Donation amount</NFTReceiptText>
            <div className="flex border-dotted border-t-2 border-gray-300 w-full"></div>
            <NFTReceiptText>
              {props.data.amount} {props.data.ticker[0]}*
            </NFTReceiptText>
          </div>
          <NFTReceiptText className="font-normal whitespace-normal">
            *{props.data.ticker[0]} is a publicy traded crypto-currency with a
            direct monetary value
          </NFTReceiptText>
          <div className="flex flex-row justify-between items-center pt-6">
            <NFTReceiptText>Monetary Value*</NFTReceiptText>
            <div className="flex border-dotted border-t-2 border-gray-300 w-full"></div>
            <NFTReceiptText>
              ${money(props.data.amountFiat)} {props.data.fiatCurrencyCode}
            </NFTReceiptText>
          </div>
          <NFTReceiptText className="font-normal pt-2">
            *At the time of transaction
          </NFTReceiptText>

          <div className="border-dotted border-t-2 border-b-2 border-gray-300 mt-6 py-2">
            <div className="flex flex-row justify-between">
              <NFTReceiptText>Donated By</NFTReceiptText>
              <NFTReceiptText>{props.data.donor.name}</NFTReceiptText>
            </div>
          </div>
          <NFTReceiptText className="font-normal pt-2 pt-4 whitespace-normal">
            No goods or services were provided in exchange for this
            contribution. Heifer International is a tax-exempt 501(c)(3)
            organization.
          </NFTReceiptText>
          <ClaimButton status={props.data.status} />
        </div>
      </div>
    </div>
  )
}

export { Status }
