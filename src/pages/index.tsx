import { StatsItem } from '@/components/StatsItem'
import { SaleTag02Icon, Store04Icon, UserMultipleIcon } from 'hugeicons-react'

export function HomePage() {
  return (
    <>
      <h1 className='title-md col-span-12 grid text-gray-500'>
        Últimos 30 dias
      </h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Confira as estatísticas da sua loja no último mês
      </span>
      <div className='col-span-3 flex flex-col gap-[15px]'>
        <StatsItem Icon={SaleTag02Icon} stat='24' text='Produtos Vendidos' />
        <StatsItem Icon={Store04Icon} stat='56' text='Produtos anunciados' />
        <StatsItem
          Icon={UserMultipleIcon}
          stat='24'
          text='Pessoas visitantes'
        />
      </div>
      <div className='col-span-9'>teste</div>
    </>
  )
}
