import { HugeiconsProps } from 'hugeicons-react'
import { cloneElement, ReactElement, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Link({
  onClick,
  children,
  IconLeft,
  IconRight,
  asChild
}: {
  IconLeft?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  IconRight?: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  children: ReactNode
  asChild?: boolean
  onClick?: () => void
}) {
  if (asChild) {
    const convertedChildren = children as ReactElement
    const element = cloneElement(convertedChildren, {
      className: twMerge(
        'text-orange-base hover:text-orange-dark cursor-pointer',
        convertedChildren?.props?.className
      )
    })
    return element
  }

  return (
    <a
      className='flex cursor-pointer gap-2 text-orange-base hover:text-orange-dark'
      onClick={onClick}
    >
      {IconLeft && <IconLeft />} {children} {IconRight && <IconRight />}
    </a>
  )
}
