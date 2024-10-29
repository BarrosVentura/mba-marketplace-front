import { HugeiconsProps } from 'hugeicons-react'
import { Input } from '../Input'
import { useState } from 'react'
import { SelectItem } from '../SelectItem'

export function Select({
  IconLeft,
  id,
  label,
  placeholder,
  isError
}: {
  label?: string
  id: string
  placeholder: string
  IconLeft?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  IconRight?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  isError?: boolean
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const options = ['cor', 'tipo', 'teste']

  function handleSelectItemClick(item: string) {
    if (selectedOptions.includes(item)) {
      return setSelectedOptions((state) =>
        state.filter((content) => content !== item)
      )
    }
    setSelectedOptions((state) => [...state, item])
  }

  return (
    <div className='relative'>
      <Input
        IconLeft={IconLeft}
        id={id}
        label={label}
        placeholder={placeholder}
        isError={isError}
        onClick={() => setIsDropdownOpen((state) => !state)}
      />

      {isDropdownOpen && (
        <div className='absolute flex w-full flex-col items-start'>
          {options.map((item) => (
            <SelectItem
              key={item}
              label={item}
              isSelected={selectedOptions.includes(item)}
              onClick={() => handleSelectItemClick(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
