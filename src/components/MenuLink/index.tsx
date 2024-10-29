import { HugeiconsProps } from 'hugeicons-react'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export function MenuLink({
  children,
  to,
  IconLeft
}: {
  children: ReactNode
  to: string
  IconLeft: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
}) {
  const location = useLocation()

  const isActive = location.pathname == to

  return (
    <Link
      to={to}
      className={twMerge(
        'body-sm flex items-center gap-2 rounded-xl px-4 py-3 text-gray-300 hover:text-orange-base',
        isActive && 'bg-shape text-orange-base'
      )}
    >
      <IconLeft /> {children}
    </Link>
  )
}
