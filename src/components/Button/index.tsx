import { HugeiconsProps } from 'hugeicons-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Button({
  IconLeft,
  IconRight,
  onClick,
  size,
  type,
  stretch,
  children
}: {
  IconLeft?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  IconRight?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  onClick: () => void
  size: 'medium' | 'small'
  type: 'outline' | 'solid'
  stretch: 'contain' | 'full'
  children: ReactNode
}) {
  const solidStyles = 'bg-orange-base  text-white hover:bg-orange-dark'
  const outlineStyles =
    'border border-orange-base bg-transparent text-orange-base hover:border-orange-dark hover:text-orange-dark'

  const mediumSizeStyle = 'action-md px-5 py-4'
  const smallSizeStyle = 'action-sm px-4 py-3'

  const containStyle = 'gap-2'
  const fullStyle = 'w-full justify-between'

  const propsDictionary = {
    medium: mediumSizeStyle,
    small: smallSizeStyle,
    solid: solidStyles,
    outline: outlineStyles,
    contain: containStyle,
    full: fullStyle
  }

  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex rounded-lg',
        propsDictionary[size],
        propsDictionary[type],
        propsDictionary[stretch]
      )}
    >
      {IconLeft && <IconLeft />}
      <span>{children}</span>
      {IconRight && <IconRight />}
    </button>
  )
}
