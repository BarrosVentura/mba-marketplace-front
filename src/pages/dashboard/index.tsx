import { StatsItem } from '@/components/StatsItem'
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

const data = [
  {
    name: '26',
    pv: 2400,
    amt: 2400
  },
  {
    name: '27',
    pv: 1398,
    amt: 2210
  },
  {
    name: '28',
    pv: 9800,
    amt: 2290
  },
  {
    name: '29',
    pv: 3908,
    amt: 2000
  },
  {
    name: '30',
    pv: 4800,
    amt: 2181
  },
  {
    name: '1',
    pv: 3800,
    amt: 2500
  },
  {
    name: '2',
    pv: 4300,
    amt: 2100
  }
]

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
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              width={500}
              height={300}
              data={data}
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
                dataKey='name'
                className='body-xs text-gray-200'
              />
              <YAxis axisLine={false} className='body-xs text-gray-200' />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='pv'
                stroke={colors.blue[400]}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
