import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'

export interface ModalProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
  text: string
}

const ModalText = React.forwardRef<HTMLParagraphElement, ModalProps>(
  ({ className, text, ...props }, ref) => {
    return (
      <p ref={ref} className={cn('text-lg font-bold', className)} {...props}>
        {text}
      </p>
    )
  }
)
ModalText.displayName = 'modal-text'

export { ModalText }
