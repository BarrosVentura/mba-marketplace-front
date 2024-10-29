import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  SaleTag02Icon
} from 'hugeicons-react'
import { Input } from '../Input'
import { useState } from 'react'
import { SelectItem } from '../SelectItem'

export function Select({
  id,
  label,
  placeholder,
  isError
}: {
  label?: string
  id: string
  placeholder: string
  isError?: boolean
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>('')
  const options = ['cor', 'tipo', 'teste']

  function handleSelectItemClick(item: string) {
    if (selectedOption == item) {
      return setSelectedOption('')
    }
    setSelectedOption(item)
  }

  return (
    <div className='relative'>
      <Input
        IconLeft={SaleTag02Icon}
        id={id}
        label={label}
        placeholder={placeholder}
        isError={isError}
        onClick={() => setIsDropdownOpen((state) => !state)}
        value={selectedOption}
        actions={
          <div className='absolute right-0 top-[50%] z-20 flex translate-y-[-50%] gap-1 rounded border border-transparent bg-none text-gray-300'>
            {selectedOption && (
              <button
                className='grid h-6 w-6 place-items-center rounded-full bg-shape'
                onClick={() => setSelectedOption('')}
              >
                <Cancel01Icon className='h-4 w-4' />
              </button>
            )}
            {isDropdownOpen ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
          </div>
        }
      />

      {isDropdownOpen && (
        <div className='absolute flex w-full flex-col items-start'>
          {options.map((item) => (
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
}
