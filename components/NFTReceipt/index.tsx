import { useContext } from 'react'
import Image from 'next/image'
import { TimestampToDateString } from '../ui/date-posted'
import money from '@/lib/utils/money'
import { ReceiptStatus } from '../ui/receipt-status'
import { ClaimButton } from '../ui/button'
import { NFTReceiptText } from './NFTReceiptText'
import { DonationContext } from '@/components/DonationView'

const Status = {
  pending: 'Pending',
  minted: 'Minted',
  minting: 'Minting',
  failed: 'Failed',
}

export default function NFTReceipt(props:any) {
  const receipt = props.data
  const {donation, setDonation} = useContext(DonationContext)
  //console.log('Donation', donation)
  return (
    <div className="flex min-h-full w-full">
      <div className="relative bg-white dark:bg-slate-500 p-6 my-4 h-auto shadow-xl">
        <div className="border-dotted border-t-2 border-b-2 border-gray-300 p-2">
          <h3 className="text-3xl font-semibold uppercase text-center text-gray-500 dark:text-white">
            NFT Receipt
          </h3>
        </div>
        <div className="relative my-4 w-full h-48">
          <Image
            src={donation.image}
            alt="IMG BG"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <ReceiptStatus status={donation.status} />

        <div className="p-2">
          <TimestampToDateString className="pt-2 text-sm text-right font-bold text-gray-500 dark:text-white" timestamp={donation.date} />
          <NFTReceiptText>{donation.organization.name}</NFTReceiptText>
          <NFTReceiptText className="font-normal">
            EIN: {donation.organization.ein}
          </NFTReceiptText>
          <NFTReceiptText className="font-normal whitespace-pre">
            {donation.organization.address}
          </NFTReceiptText>
          <div className="flex flex-row justify-between items-center pt-6">
            <NFTReceiptText>Donation amount</NFTReceiptText>
            <div className="flex border-dotted border-t-2 border-gray-300 w-full"></div>
            <NFTReceiptText>
              {money(donation.amount, 2)} {donation.ticker}*
            </NFTReceiptText>
          </div>
          <NFTReceiptText className="font-normal whitespace-normal">
            *{donation.ticker} is a publicly traded crypto-currency with a direct monetary value
          </NFTReceiptText>
          <div className="flex flex-row justify-between items-center pt-6">
            <NFTReceiptText>Monetary Value*</NFTReceiptText>
            <div className="flex border-dotted border-t-2 border-gray-300 w-full"></div>
            <NFTReceiptText>
              {money(donation.amountFiat, 2)} {donation.fiatCurrencyCode}
            </NFTReceiptText>
          </div>
          <NFTReceiptText className="font-normal pt-0">
            *At the time of transaction
          </NFTReceiptText>

          <div className="border-dotted border-t-2 border-b-2 border-gray-300 mt-6 py-2">
            <div className="flex flex-row justify-between">
              <NFTReceiptText>Donated By</NFTReceiptText>
              <NFTReceiptText>{donation.donor.name}</NFTReceiptText>
            </div>
          </div>
          <NFTReceiptText className="font-normal pt-2 pt-4 whitespace-normal">
            No goods or services were provided in exchange for this
            contribution. {donation.organization.name} is a tax-exempt 501(c)(3)
            organization.
          </NFTReceiptText>
          <ClaimButton status={donation.status} />
        </div>
      </div>
    </div>
  )
}

export { Status }
