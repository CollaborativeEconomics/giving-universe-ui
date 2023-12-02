'use client'

import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'
import { ModalText } from './modal'
import Select from 'react-select'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface CheckboxProps extends InputProps {
  text: string
}

export interface SelectInputProps extends InputProps {
  options: {
    value: string
    // image: string
  }[]
}

interface Option {
  value: string
  label: React.JSX.Element
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, ...props }, ref) => {
    return (
      <input
        type={type}
        id={id}
        className={cn(
          'flex h-10 w-full rounded-full border border-input border-2 border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, text, id, type, ...props }, ref) => {
    return (
      <div
        className={cn('flex flex-row gap-4', className)}
        ref={ref}
        {...props}
      >
        <div className="align-middle">
          <input type="checkbox" className="align-middle" id={id} />
        </div>
        <div className="align-middle">
          <ModalText text={text} />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'checkbox'

const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ className, options, type, ...props }, ref) => {
    return (
      <div>
        <Select
          className="pl-6 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          options={buildOptions(options)}
        />
      </div>
    )
  }
)
SelectInput.displayName = 'select'

function buildOptions(
  selectOptions: {
    value: string
    // image: string
  }[]
): Array<Option> {
  let options = new Array<Option>()
  options.push(
    ...selectOptions.map((option) => {
      return makeOption(
        option.value,
        'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig04.deviantart.net%2F2c94%2Ff%2F2015%2F125%2Fb%2F1%2Fcandy_the_cat___50x50_icon_by_dahooplerzman-d8sc0bt.png&f=1&nofb=1&ipt=4bc7a9de2fe9ee963c2a86fc77bda31143278d23ee7dafc12b9cbe81d725863c&ipo=images'
      )
    })
  )
  return options
}

function makeOption(value: string, image: string): Option {
  return {
    value: value,
    label: (
      <div>
        <img src={image} />
        {value}
      </div>
    ),
  }
}

export { Input, Checkbox, SelectInput as Select }
