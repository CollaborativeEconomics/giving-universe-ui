'use client'
import Rive from '@rive-app/react-canvas'

import { Button } from '../ui/button'
import { ActionBarBox, ActionBarButton } from './ActionBarContent'
import RiveAnimation from './RiveAnimation'
import {
  InstructionPaneSectionImage,
  InstructionPaneSectionText,
  InstructionPaneSectionTitle,
} from './InstructionPaneSection'
import Image from 'next/image'
import Link from 'next/link'

export default function InstructionPanes() {
  return (
    <div className="relative flex flex-col container pt-20 pl-20 w-full">
      <h2 className="text-5xl font-bold pb-8">How it works</h2>
      <div className="flex flex-row">
        {/* <RiveAnimation /> */}
        <p className="text-5xl mr-20">1</p>
        <div className="relative flex flex-col w-full">
          <InstructionPaneSectionTitle>
            Donate to community causes you care about
          </InstructionPaneSectionTitle>
          <InstructionPaneSectionText>
            Find organizations working on the{' '}
            <Link
              className="hover:underline"
              href="https://www.cfce.io/un2030/"
            >
              sustainable development goals
            </Link>{' '}
            that you care most about, and that are working in your community or
            a community you care about
          </InstructionPaneSectionText>
        </div>
      </div>
      <InstructionPaneSectionImage className='bg-[url("/DonateV2.jpg")]' />
      <div className="flex flex-row">
        {/* <RiveAnimation /> */}
        <p className="text-5xl mr-20">2</p>
        <div className="relative flex flex-col w-full">
          <InstructionPaneSectionTitle>
            Receive personalized, tax-deductible NFT Receipts
          </InstructionPaneSectionTitle>
          <InstructionPaneSectionText>
            Whenever you donate, you receive a personalzed tax-deductible NFT
            receipt.
          </InstructionPaneSectionText>
        </div>
      </div>
      <InstructionPaneSectionImage className="bg-[url('/NFTReceiptV2.jpg')]" />
      <div className="flex flex-row">
        {/* <RiveAnimation /> */}
        <p className="text-5xl mr-20">3</p>
        <div className="relative flex flex-col w-full">
          <InstructionPaneSectionTitle>
            NFTs tell the story of your impact
          </InstructionPaneSectionTitle>
          <InstructionPaneSectionText>
            Non-profits publish and distribute their progress as Story NFTs.
            Watch the impact from your donation unfold!
          </InstructionPaneSectionText>
        </div>
      </div>
      <InstructionPaneSectionImage className="bg-[url('/ReceiveNFTV2.jpg')]" />
    </div>
  )
}
