import { twMerge } from 'tailwind-merge'

export function Tag({ type }: { type: 'available' | 'sold' | 'disabled' }) {
  const typeHashtable = {
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
    portable: {
      style: 'bg-gray-400 text-white',
      text: 'móvel'
    }
  }

  return (
    <div
      className={twMerge(
        'label-sm rounded-full px-2 py-1 uppercase',
        typeHashtable[type].style
      )}
    >
      {typeHashtable[type].text}
    </div>
  )
}
