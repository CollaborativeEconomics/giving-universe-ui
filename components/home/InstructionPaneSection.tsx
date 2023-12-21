'use client'

import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'

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
  <div className="flex h-screen my-12">
    <div
      className={cn(
        'absolute hover:mix-blend-screen w-full h-screen bg-fixed bg-center bg-cover',
        className
      )}
      {...props}
    />
    <div className="absolute mix-blend-screen w-full h-screen bg-fixed bg-center bg-cover bg-[url('/ColorOverlay.png')] transition-opacity opacity-0 hover:opacity-100 ease-in-out duration-1000" />
  </div>
)
InstructionPaneSectionImage.displayName = 'instruction-pane-section-image'

export {
  InstructionPaneSectionTitle,
  InstructionPaneSectionText,
  InstructionPaneSectionImage,
  InstructionPaneSectionContent,
}
