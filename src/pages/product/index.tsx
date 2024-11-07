import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { getSellerProducts } from '@/service/get-seller-products'
import { useQuery } from '@tanstack/react-query'
import { Search01Icon } from 'hugeicons-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'react-router-dom'
import { Status } from '@/@types/status'

const productSearchSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional()
})

type ProductSearchSchema = z.infer<typeof productSearchSchema>

const STATUS_OPTIONS = [
  ['available', 'Anunciado'],
  ['sold', 'Vendido'],
  ['cancelled', 'Cancelado']
]

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, handleSubmit, setValue, getValues } =
    useForm<ProductSearchSchema>({
      resolver: zodResolver(productSearchSchema),
      defaultValues: {
        search: searchParams.get('search') || '',
        status:
          STATUS_OPTIONS.find(
            (status) => status[0] == searchParams.get('status')
          )?.[1] || ''
      }
    })

  const sellerProducts = useQuery({
    queryFn: (ctx) =>
      getSellerProducts({
        search: ctx.queryKey[1],
        status: ctx.queryKey[2] as Status
      }),
    queryKey: [
      'seller-products',
      searchParams.get('search'),
      searchParams.get('status')
    ]
  })

  function handleFilterSubmit(data: ProductSearchSchema) {
    const status = STATUS_OPTIONS.find(
      (status) => status[1] == data.status
    )?.[0]

    const initialParams = new URLSearchParams()
    if (status) initialParams.set('status', status)
    if (data.search) initialParams.set('search', data.search)

    setSearchParams(initialParams)
  }

  return (
    <>
      <h1 className='title-md col-span-12 text-gray-500'>Seus produtos</h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Acesse gerencie a sua lista de produtos à venda
      </span>
      <div className='col-span-4 h-fit rounded-[20px] bg-white p-6'>
        <h2 className='title-sm mb-6 text-gray-300'>Filtrar</h2>

        <form onSubmit={handleSubmit(handleFilterSubmit)}>
          <Input
            className='mb-5'
            id='search'
            IconLeft={Search01Icon}
            placeholder='Pesquisar'
            {...register('search')}
          />
          <Select
            id='status'
            placeholder='Categoria'
            options={STATUS_OPTIONS.map((status) => status[1])}
            onRemove={() => setValue('status', '')}
            initialValue={getValues('status')}
            {...register('status')}
          />
          <Button className='mt-10' size='medium' stretch='full' type='solid'>
            Aplicar Filtro
          </Button>
        </form>
      </div>
      <div className='col-span-8 grid grid-cols-2 gap-4'>
        {!sellerProducts.isError &&
          !sellerProducts.isLoading &&
          sellerProducts.data?.data.products.map(
            ({
              category,
              id,
              description,
              priceInCents,
              status,
              title,
              attachments
            }) => (
              <Card
                key={id}
                id={id}
                category={category.title}
                description={description}
                price={priceInCents}
                mainImageUrl={attachments[0].url}
                status={status}
                title={title}
              />
            )
          )}
      </div>
    </>
  )
}
