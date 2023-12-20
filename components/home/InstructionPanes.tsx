'use client'
import Rive from '@rive-app/react-canvas'

import { Button } from '../ui/button'
import { ActionBarBox, ActionBarButton } from './ActionBarContent'
import RiveAnimation from './RiveAnimation'

export default function InstructionPanes() {
  return (
    <div className="flex flex-col container pt-20">
      <h2 className="text-5xl font-bold">How it works</h2>
      <div className="w-80 bg-white pb-40">
        <RiveAnimation />
      </div>
    </div>
  )
}
