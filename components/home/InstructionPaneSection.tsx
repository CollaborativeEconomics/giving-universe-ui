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

const InstructionPaneSectionImage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex items-center flex-col space-y-40  h-screen mb-12 bg-fixed bg-center bg-cover',
      className
    )}
    {...props}
  ></div>
)
InstructionPaneSectionImage.displayName = 'instruction-pane-section-image'

export {
  InstructionPaneSectionTitle,
  InstructionPaneSectionText,
  InstructionPaneSectionImage,
}
