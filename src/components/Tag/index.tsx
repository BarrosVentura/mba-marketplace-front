import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Tag({
  type,
  children
}: {
  children?: ReactNode
  type?: 'available' | 'sold' | 'disabled'
}) {
  const typeHashTable = {
    available: {
      style: 'bg-blue-dark text-white',
      text: 'anunciado'
    },
    sold: {
      style: 'bg-success text-white',
      text: 'vendido'
    },
    disabled: {
      style: 'bg-gray-300 text-white',
      text: 'desativado'
    },
    cancelled: {
      style: 'bg-gray-300 text-white',
      text: 'cancelado'
    }
  }

  return (
    <div
      className={twMerge(
        'label-sm rounded-full bg-gray-400 px-2 py-1 uppercase text-white',
        type && typeHashTable[type].style
      )}
    >
      {type ? typeHashTable[type].text : children}
    </div>
  )
}
