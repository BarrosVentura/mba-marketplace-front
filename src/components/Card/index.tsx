import { Status } from '@/@types/status'
import { Tag } from '../Tag'

interface CardProps {
  status: Status
  category: string
  title: string
  price: number
  description: string
  mainImageUrl: string
}

export function Card({
  status,
  category,
  title,
  price,
  description,
  mainImageUrl
}: CardProps) {
  return (
    <a className='relative rounded-[20px] bg-white'>
      <div className='absolute right-1 top-1 flex gap-1'>
        <Tag type={status} />
        <Tag>{category}</Tag>
      </div>
      <img
        className='h-[144px] w-full rounded-2xl object-cover p-1'
        src={mainImageUrl}
        alt=''
      />
      <div className='p-3'>
        <div className='mb-2 flex justify-between'>
          <span className='subtitle text-gray-400'>{title}</span>
          <div>
            <span className='label-md text-gray-500'>R$</span>
            <span className='font-display text-lg font-bold text-gray-500'>
              {price}
            </span>
          </div>
        </div>
        <p className='body-sm line-clamp-2 text-gray-300'>{description}</p>
      </div>
    </a>
  )
}
