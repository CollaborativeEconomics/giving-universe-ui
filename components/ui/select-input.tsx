// import React from 'react'
// import { InputProps } from './input'
// import { cn } from '@/lib/shadCnUtil'
// import Select from 'react-select'

// interface Option {
//   value: string
//   symbol?: string
//   label: React.JSX.Element
// }

// export interface SelectInputProps extends InputProps {
//   currentOption: { value: string; image: string; symbol?: string }
//   handleChange: any
//   options: {
//     value: string
//     image: string
//     symbol?: string
//   }[]
// }

// const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
//   ({ className, options, currentOption, handleChange, ...props }, ref) => {
//     return (
//       <div className={cn('', className)}>
//         <Select
//           instanceId={options[0].value}
//           styles={{
//             control: (baseStyles) => ({
//               ...baseStyles,
//               borderRadius: '20px',
//               borderWidth: '2px',
//               borderColor: 'rgb(203 213 225)', //slate-300
//             }),
//             option: (baseStyles) => ({
//               ...baseStyles,
//               color: 'black',
//             }),
//           }}
//           isSearchable={false}
//           options={buildOptions(options)}
//           onChange={handleChange}
//         />
//       </div>
//     )
//   }
// )
// SelectInput.displayName = 'select'

// function buildOptions(
//   selectOptions: SelectInputProps['options']
// ): Array<Option> {
//   return selectOptions.map((option) => {
//     return makeOption(option.value, option.image, option.symbol)
//   })
// }

// function makeOption(value: string, image: string, symbol?: string): Option {
//   return {
//     value: value,
//     symbol: symbol || '',
//     label: (
//       <div className="flex flex-row gap-3">
//         <img src={image} width="25px" />
//         <div className="my-auto">{value}</div>
//       </div>
//     ),
//   }
// }

// export { SelectInput as Select }
