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
  <h3
    className={cn('md:mx-20 text-3xl font-bold pb-4', className)}
    {...props}
  />
)
InstructionPaneSectionTitle.displayName = 'instruction-pane-section-title'

const InstructionPaneSectionText = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('max-w-[600px] md:mx-20', className)} {...props} />
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

const InstructionPaneSectionOverlay = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div>
    <div
      className={cn(
        'absolute mix-blend-screen w-full h-screen bg-fixed bg-center bg-cover',
        className
      )}
      {...props}
    />
    <div className="absolute mix-blend-screen w-full h-screen bg-fixed bg-center bg-cover bg-[url('/ColorOverlay.png')]" />
  </div>
)
InstructionPaneSectionOverlay.displayName = 'instruction-pane-section-overlay'

function InstructionPaneSectionImageBlend(
  props: InstructionImageProps
): React.ReactElement {
  return (
    <div className="flex h-screen my-8 md:my-12">
      <InstructionPaneSectionImage className={props.sourceProperty} />
      <OverlayHandler sourceProperty={props.sourceProperty} />
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
