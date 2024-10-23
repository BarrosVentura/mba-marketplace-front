import {
  AlertCircleIcon,
  HugeiconsProps,
  ViewIcon,
  ViewOffIcon
} from 'hugeicons-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function Input({
  label,
  id,
  placeholder,
  IconLeft,
  isError,
  helperText,
  toggleView
}: {
  label: string
  id: string
  placeholder: string
  IconLeft?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  IconRight?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  isError?: boolean
  helperText?: string
  toggleView?: boolean
}) {
  const [togglePasswordView, setTogglePasswordView] = useState(false)

  function handleTogglePassword() {
    setTogglePasswordView((prev) => !prev)
  }

  return (
    <div
      className={twMerge(
        'group',
        isError
          ? 'text-danger'
          : 'text-gray-200 has-[input:focus]:text-orange-base has-[input:not(:placeholder-shown)]:text-orange-base'
      )}
    >
      <label
        htmlFor={id}
        className={twMerge(
          'label-md text-gray-300',
          isError ? '' : 'group-has-[input:focus]:text-current'
        )}
      >
        {label}
      </label>
      <div className='relative flex'>
        {IconLeft && (
          <IconLeft className='absolute top-[50%] z-0 translate-y-[-50%]' />
        )}
        <input
          type={toggleView && togglePasswordView ? 'password' : 'text'}
          id={id}
          placeholder={placeholder}
          className='z-10 w-full border-b border-b-gray-100 bg-transparent px-8 py-[14px] text-gray-400 caret-orange-base outline-none'
        />
        {toggleView && (
          <button
            className='absolute right-0 top-[50%] z-20 translate-y-[-50%] rounded border border-transparent bg-none text-gray-300 outline-none focus:border-orange-base'
            onClick={(e) => {
              e.preventDefault()
              handleTogglePassword()
            }}
          >
            {togglePasswordView ? <ViewIcon /> : <ViewOffIcon />}
          </button>
        )}
      </div>
      {isError && (
        <div className='flex items-center gap-1 pt-2'>
          <AlertCircleIcon className='text-current' width={14} height={14} />{' '}
          <span className='body-xs'>{helperText}</span>
        </div>
      )}
    </div>
  )
}
