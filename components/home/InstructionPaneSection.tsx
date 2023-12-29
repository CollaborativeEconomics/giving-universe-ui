'use client'

import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'
import { OverlayHandler } from './OverlayHandler'

export interface InstructionImageProps {
  sourceProperty: string
}

const InstructionPaneSectionTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-3xl font-bold pb-4', className)} {...props} />
)
InstructionPaneSectionTitle.displayName = 'instruction-pane-section-title'

const InstructionPaneSectionText = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('w-[600px]', className)} {...props} />
)
InstructionPaneSectionText.displayName = 'instruction-pane-section-text'

const InstructionPaneSectionContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <div className={cn('relative flex flex-col w-full', className)} {...props} />
)
InstructionPaneSectionContent.displayName = 'instruction-pane-section-content'

const InstructionPaneSectionImage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'absolute w-full h-screen bg-fixed bg-center bg-cover',
      className
    )}
    {...props}
  />
)
InstructionPaneSectionImage.displayName = 'instruction-pane-section-image'

const InstructionPaneSectionOverlay =
  ({}: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="absolute w-full h-screen bg-fixed bg-center bg-cover bg-[url('/ColorOverlay.png')]" />
  )
InstructionPaneSectionOverlay.displayName = 'instruction-pane-section-overlay'

function InstructionPaneSectionImageBlend(
  props: InstructionImageProps
): React.ReactElement {
  return (
    <div className="flex h-screen my-12">
      <InstructionPaneSectionImage className={props.sourceProperty} />
      <OverlayHandler />
    </div>
  )
}

export {
  InstructionPaneSectionTitle,
  InstructionPaneSectionText,
  InstructionPaneSectionContent,
  InstructionPaneSectionOverlay,
  InstructionPaneSectionImageBlend,
}
