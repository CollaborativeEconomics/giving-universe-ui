import * as React from 'react'
import { InputProps } from './ui/input'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from './ui/select'

export interface SelectInputProps extends InputProps {
  className?: string
  currentOption: { value: string; image: string; symbol?: string }
  handleChange: any
  options: {
    value: string
    image: string
    symbol?: string
  }[]
  placeHolderText: string
}

const DonationFormSelect = React.forwardRef<HTMLInputElement, SelectInputProps>(
  (
    {
      className,
      options,
      currentOption,
      placeHolderText,
      handleChange,
      ...props
    },
    ref
  ) => {
    return (
      <Select onValueChange={handleChange}>
        <SelectTrigger
          className={`h-10 text-lg w-full rounded-full border border-2 border-slate-300 bg-white ring-offset-background focus-within:border-blue-700 focus-within:ring-1 ${className || ''}`}
        >
          <SelectValue
            className="bg-white placeholder-gray-600"
            placeholder={placeHolderText}
          />
        </SelectTrigger>

        <SelectContent className="bg-white">
          {options.map((option) => {
            console.log(option)
            return (
              <SelectItem
                className="bg-white text-black"
                value={option.value}
                key={option.value}
              >
                <div className="flex flex-row gap-3">
                  <img src={option.image} width="30px" />
                  <div className="my-auto">{option.value}</div>
                </div>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    )
  }
)

DonationFormSelect.displayName = 'DonationFormSelect'

export { DonationFormSelect }
