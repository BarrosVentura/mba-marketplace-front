import { HugeiconsProps, Loading03Icon } from 'hugeicons-react'

export function StatsItem({
  Icon,
  stat,
  text,
  isLoading
}: {
  Icon: React.FC<
    Omit<HugeiconsProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  stat?: string
  text: string
  isLoading?: boolean
}) {
  return (
    <div className='flex gap-4 rounded-3xl bg-white p-3'>
      <div className='grid h-[86px] w-20 flex-shrink-0 place-items-center rounded-xl bg-blue-light'>
        <Icon className='h-10 w-10 text-blue-dark' path='inherit' />
      </div>
      <div className='flex flex-col'>
        {isLoading ? (
          <Loading03Icon height={40} width={40} className='animate-spin' />
        ) : (
          <span className='title-lg text-gray-400'>{stat}</span>
        )}
        <span className='body-xs text-gray-300'>{text}</span>
      </div>
    </div>
  )
}
