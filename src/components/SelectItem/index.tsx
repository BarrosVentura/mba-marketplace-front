import { Tick02Icon } from 'hugeicons-react'
import { twMerge } from 'tailwind-merge'

export function SelectItem({
  label,
  onClick,
  isSelected
}: {
  label: string
  onClick: () => void
  isSelected: boolean
}) {
  const styles = twMerge(
    'w-full bg-white p-4 text-left text-gray-300 hover:text-orange-dark flex justify-between',
    isSelected && 'text-orange-base'
  )

  return (
    <button
      onClick={(event) => {
        event.preventDefault()
        onClick()
      }}
      className={styles}
    >
      <span>{label}</span>
      {isSelected && <Tick02Icon className='text-orange-base' />}
    </button>
  )
}
