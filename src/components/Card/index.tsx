import { Tag } from '../Tag'

export function Card() {
  return (
    <a className='relative rounded-[20px] bg-white'>
      <div className='absolute right-1 top-1 flex gap-1'>
        <Tag type='available' />
        <Tag>Móvel</Tag>
      </div>
      <img
        className='h-[144px] w-full rounded-2xl object-cover p-1'
        src='https://placehold.co/600x400'
        alt=''
      />
      <div className='p-3'>
        <div className='mb-2 flex justify-between'>
          <span className='subtitle text-gray-400'>Sofá</span>
          <div>
            <span className='label-md text-gray-500'>R$</span>
            <span className='font-display text-lg font-bold text-gray-500'>
              1.200,90
            </span>
          </div>
        </div>
        <p className='body-sm line-clamp-2 text-gray-300'>
          Sofá revestido em couro legítimo, com estrutura em madeira maciça e
          pés em metal cromado.
        </p>
      </div>
    </a>
  )
}
