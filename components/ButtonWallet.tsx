'use client'
import React, { HTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ButtonProps extends HTMLAttributes<HTMLDivElement> {
  href: string
  text: string
  icon?: string
  className?: string
  disabled?: boolean
}

const style = 'flex flex-col justify-center items-center border rounded-md text-xs p-4 text-center'

const ButtonWallet = React.forwardRef<HTMLDivElement, DivProps>(
  (
    {
      href,
      text,
      icon,
      className,
      disabled,
      ...props
    }: DivProps,
    ref
  ) => (
    <div 
      disabled={disabled}
      className={`${style} ${className||''}`}
      {...{ ref }}
      {...props}
    >
      <Link href={href}>
        {icon ? (<Image src={'/wallets/'+icon} className="mb-2" width={64} height={64} alt="Chain icon" />) : null}
        {text}
      </Link>
    </div>
  )
);

ButtonWallet.displayName = 'ButtonWallet'

export default ButtonWallet
