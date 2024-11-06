import {
  AlertCircleIcon,
  HugeiconsProps,
  ViewIcon,
  ViewOffIcon
} from 'hugeicons-react'
import {
  forwardRef,
  HTMLInputAutoCompleteAttribute,
  ReactNode,
  useState
} from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'

interface InputProps {
  label?: string
  id: string
  placeholder: string
  IconLeft?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  customIcon?: ReactNode
  actions?: ReactNode
  errorMessage?: string
  toggleView?: boolean
  onClick?: () => void
  value?: string
  className?: ClassNameValue
  autoComplete?: HTMLInputAutoCompleteAttribute
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function (
  {
    label,
    id,
    placeholder,
    IconLeft,
    actions,
    errorMessage,
    toggleView,
    onClick,
    value,
    className,
    customIcon,
    autoComplete,
    ...rest
  },
  ref
) {
  const [togglePasswordView, setTogglePasswordView] = useState(false)

  function handleTogglePassword() {
    setTogglePasswordView((prev) => !prev)
  }

  return (
    <div
      className={twMerge(
        'group relative mb-3',
        className,
        errorMessage
          ? 'text-danger'
          : 'text-gray-200 has-[input:focus]:text-orange-base has-[input:not(:placeholder-shown)]:text-orange-base'
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className={twMerge(
            'label-md text-gray-300',
            errorMessage ? '' : 'group-has-[input:focus]:text-current'
          )}
        >
          {label}
        </label>
      )}
      <div className='relative flex'>
        {IconLeft && (
          <IconLeft className='absolute top-[50%] z-10 translate-y-[-50%]' />
        )}
        {customIcon}
        <input
          autoComplete={autoComplete}
          ref={ref}
          type={toggleView && togglePasswordView ? 'password' : 'text'}
          id={id}
          placeholder={placeholder}
          className={twMerge(
            'z-0 w-full border-b border-b-gray-100 bg-transparent py-[14px] text-gray-400 caret-orange-base outline-none',
            IconLeft || customIcon ? 'px-8' : 'pr-8'
          )}
          onClick={onClick}
          value={value}
          {...rest}
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
        {actions}
      </div>
      {errorMessage && (
        <div className='absolute bottom-[-20px] flex items-center gap-1'>
          <AlertCircleIcon className='text-current' width={14} height={14} />{' '}
          <span className='body-xs'>{errorMessage}</span>
        </div>
      )}
    </div>
  )
})
