'use client'

import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'
import { ModalText } from './modal'
import Select from 'react-select'
import { useEffect } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface CheckboxProps extends InputProps {
  text: string
}

export interface SwitchProps extends InputProps {
  valueBasis: boolean
  handleToggle: any
}

export interface InputWithContentProps extends InputProps {
  text: string
  divRef: any
}

export interface SelectInputProps extends InputProps {
  currentOption: { value: string; image: string; symbol?: string }
  handleChange: any
  options: {
    value: string
    image: string
    symbol?: string
  }[]
}

interface Option {
  value: string
  symbol?: string
  label: React.JSX.Element
}

const Switch = React.forwardRef<HTMLDivElement, SwitchProps>(
  ({ className, valueBasis, handleToggle, id }, ref) => {
    return (
      <div className={cn('inline-flex items-center px-4', className)} ref={ref}>
        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
          <input
            id={id}
            type="checkbox"
            checked={valueBasis}
            onChange={handleToggle}
            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
          />
          <label
            htmlFor={id}
            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-100 peer-checked:before:bg-gray-100"
          >
            <div
              className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
              data-ripple-dark="true"
            ></div>
          </label>
        </div>
      </div>
    )
  }
)
Switch.displayName = 'switch'

const InputWithContent = React.forwardRef<
  HTMLInputElement,
  InputWithContentProps
>(({ className, id, type, text, divRef, ...props }, ref) => {
  return (
    <div className="flex flex-row h-10 text-lg w-full rounded-full border border-2 border-slate-300 bg-white ring-offset-background focus-within:border-blue-700 focus-within:ring-1">
      <input
        type={type}
        id={id}
        className={cn(
          'flex h-9 text-lg text-black w-full rounded-full bg-white px-2 py-2 border-0 focus:border-0 focus:outline-0 focus:ring-0',
          className
        )}
        {...props}
      />
      <div className="my-auto pr-3 whitespace-nowrap text-slate-400">
        {text}
      </div>
    </div>
  )
})
InputWithContent.displayName = 'input-with-content'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type, ...props }, ref) => {
    return (
      <input
        type={type}
        id={id}
        className={cn(
          'flex h-10 text-lg text-black w-full rounded-full border border-input border-2 border-slate-300 bg-white px-3 py-2 ring-offset-background',
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
        className={cn('flex flex-row align-middle gap-4', className)}
        ref={ref}
        {...props}
      >
        <div>
          <input type="checkbox" id={id} />
        </div>
        <div>
          <ModalText className="pb-2" text={text} />
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'checkbox'

const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ className, options, currentOption, handleChange, ...props }, ref) => {
    return (
      <div className={cn('', className)}>
        <Select
          instanceId={options[0].value}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderRadius: '20px',
              borderWidth: '2px',
              borderColor: 'rgb(203 213 225)', //slate-300
            }),
            option: (baseStyles) => ({
              ...baseStyles,
              color: 'black',
            }),
          }}
          isSearchable={false}
          options={buildOptions(options)}
          onChange={handleChange}
        />
      </div>
    )
  }
)
SelectInput.displayName = 'select'

function buildOptions(
  selectOptions: SelectInputProps['options']
): Array<Option> {
  return selectOptions.map((option) => {
    return makeOption(option.value, option.image, option.symbol)
  })
}

function makeOption(value: string, image: string, symbol?: string): Option {
  return {
    value: value,
    symbol: symbol || '',
    label: (
      <div className="flex flex-row gap-3">
        <img src={image} width="25px" />
        <div className="my-auto">{value}</div>
      </div>
    ),
  }
}

export { Switch, Input, InputWithContent, Checkbox, SelectInput as Select }
