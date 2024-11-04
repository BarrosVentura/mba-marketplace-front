import { StatsItem } from '@/components/StatsItem'
import { getAvailableProductsMetric } from '@/service/get-available-products-metric'
import { getSoldProductsMetric } from '@/service/get-sold-products-metric'
import { getViewCountMetric } from '@/service/get-view-count'
import { getViewCountPerDayMetric } from '@/service/get-view-count-per-day'
import { useQuery } from '@tanstack/react-query'
import {
  Calendar04Icon,
  SaleTag02Icon,
  Store04Icon,
  UserMultipleIcon
} from 'hugeicons-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import colors from 'tailwindcss/colors'

export function HomePage() {
  const soldMetrics = useQuery({
    queryFn: getSoldProductsMetric,
    queryKey: ['sold-products']
  })

  const availableMetrics = useQuery({
    queryFn: getAvailableProductsMetric,
    queryKey: ['available-products']
  })

  const viewCount = useQuery({
    queryFn: getViewCountMetric,
    queryKey: ['view-count']
  })

  const viewCountPerDay = useQuery({
    queryFn: getViewCountPerDayMetric,
    queryKey: ['view-count-per-day']
  })

  return (
    <>
      <h1 className='title-md col-span-12 grid text-gray-500'>
        Últimos 30 dias
      </h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Confira as estatísticas da sua loja no último mês
      </span>
      <div className='col-span-3 flex flex-col gap-[15px]'>
        <StatsItem
          Icon={SaleTag02Icon}
          stat={soldMetrics.data?.data.amount}
          text='Produtos Vendidos'
          isLoading={soldMetrics.isLoading}
        />
        <StatsItem
          Icon={Store04Icon}
          stat={availableMetrics.data?.data.amount}
          text='Produtos anunciados'
          isLoading={availableMetrics.isLoading}
        />
        <StatsItem
          Icon={UserMultipleIcon}
          stat={viewCount.data?.data.amount}
          text='Pessoas visitantes'
          isLoading={viewCount.isLoading}
        />
      </div>
      <div className='col-span-9 rounded-3xl bg-white p-6 pb-5'>
        <div className='mb-[28px] flex justify-between'>
          <h3 className='title-sm leading-5 text-gray-500'>Visitantes</h3>
          <div className='flex items-center gap-2'>
            <Calendar04Icon className='h-4 w-4 text-blue-dark' />
            <span className='label-sm text-gray-300'>
              26 de junho - 25 de julho
            </span>
          </div>
        </div>
        <div className='h-[266px] w-full'>
          {!viewCountPerDay.isLoading && !viewCountPerDay.isError && (
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                width={500}
                height={300}
                data={viewCountPerDay.data?.data.viewsPerDay}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray='4 5' />
                <XAxis
                  axisLine={false}
                  dataKey='date'
                  className='body-xs text-gray-200'
                />
                <YAxis axisLine={false} className='body-xs text-gray-200' />
                <Tooltip />
                <Line
                  type='monotone'
                  dataKey='amount'
                  stroke={colors.blue[400]}
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  )
}
