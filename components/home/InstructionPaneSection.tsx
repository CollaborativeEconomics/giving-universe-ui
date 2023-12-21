'use client'

import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'
import { useInView } from 'react-intersection-observer'

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

const InstructionPaneSectionImagePlain = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="flex h-screen my-12">
    <div
      className={cn(
        'absolute w-full h-screen bg-fixed bg-center bg-cover',
        className
      )}
      {...props}
    />
  </div>
)
InstructionPaneSectionImagePlain.displayName =
  'instruction-pane-section-image-plain'

const InstructionPaneSectionImageOverlay = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="flex h-screen my-12">
    <div className="absolute hover:mix-blend-screen w-full h-screen bg-fixed bg-center bg-cover bg-[url('/ColorOverlay.png')]" />
    <div
      className={cn(
        'absolute hover:mix-blend-screen w-full h-screen bg-fixed bg-center bg-cover',
        className
      )}
      {...props}
    />
  </div>
)
InstructionPaneSectionImageOverlay.displayName =
  'instruction-pane-section-image-overlay'

function InstructionPaneSectionImage(
  props: InstructionImageProps
): React.ReactElement {
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  })

  if (inView) {
    return (
      <div ref={ref}>
        <InstructionPaneSectionImageOverlay className={props.sourceProperty} />
      </div>
    )
  } else {
    return (
      <div ref={ref}>
        <InstructionPaneSectionImagePlain className={props.sourceProperty} />
      </div>
    )
  }
}

export {
  InstructionPaneSectionTitle,
  InstructionPaneSectionText,
  InstructionPaneSectionContent,
  InstructionPaneSectionImage,
}
