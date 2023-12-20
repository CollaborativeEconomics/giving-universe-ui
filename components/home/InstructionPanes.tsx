'use client'
import Rive from '@rive-app/react-canvas'

import { Button } from '../ui/button'
import { ActionBarBox, ActionBarButton } from './ActionBarContent'
import RiveAnimation from './RiveAnimation'

export default function InstructionPanes() {
  return (
    <div className="flex flex-col container pt-20 pl-20 w-full">
      <h2 className="text-5xl font-bold pb-8">How it works</h2>
      <div className="flex flex-row">
        {/* <RiveAnimation /> */}
        <p className="text-5xl mr-20">1</p>
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold pb-4">
            Donate to community causes you care about
          </h3>
          <span className="w-[600px]">
            Find organizations working on the sustainable development goals that
            you care most about, and that are working in your community or a
            community you care about
          </span>
        </div>
      </div>
    </div>
  )
}
