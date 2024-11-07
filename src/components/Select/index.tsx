import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  SaleTag02Icon
} from 'hugeicons-react'
import { forwardRef, useState } from 'react'

import { Input } from '../Input'
import { SelectItem } from '../SelectItem'

interface SelectProps {
  label?: string
  id: string
  placeholder: string
  isError?: boolean
  hideIcon?: boolean
  options?: string[]
  onRemove: () => void
  initialValue?: string
}

export const Select = forwardRef<HTMLInputElement, SelectProps>(function (
  {
    id,
    label,
    placeholder,
    hideIcon,
    options,
    onRemove,
    initialValue,
    ...rest
  },
  ref
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>(
    initialValue || ''
  )

  function handleSelectItemClick(item: string) {
    if (selectedOption == item) {
      return setSelectedOption('')
    }
    setSelectedOption(item)
  }

  return (
    <div className='relative'>
      <Input
        autoComplete='off'
        ref={ref}
        IconLeft={hideIcon ? undefined : SaleTag02Icon}
        id={id}
        label={label}
        placeholder={placeholder}
        value={selectedOption}
        onClick={() => setIsDropdownOpen((state) => !state)}
        actions={
          <div className='absolute right-0 top-[50%] z-20 flex translate-y-[-50%] gap-1 rounded border border-transparent bg-none text-gray-300'>
            {selectedOption && (
              <button
                className='grid h-6 w-6 place-items-center rounded-full bg-shape'
                onClick={() => {
                  setSelectedOption('')
                  onRemove()
                }}
              >
                <Cancel01Icon className='h-4 w-4' />
              </button>
            )}
            {isDropdownOpen ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
          </div>
        }
        {...rest}
      />

      {isDropdownOpen && (
        <div className='absolute flex w-full flex-col items-start'>
          {options?.map((item) => (
            <SelectItem
              key={item}
              label={item}
              isSelected={selectedOption == item}
              onClick={() => handleSelectItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
})
