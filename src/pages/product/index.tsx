import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { getSellerProducts } from '@/service/get-seller-products'
import { useQuery } from '@tanstack/react-query'
import { Search01Icon } from 'hugeicons-react'

export function ProductsPage() {
  const sellerProducts = useQuery({
    queryFn: getSellerProducts,
    queryKey: ['seller-products']
  })

  return (
    <>
      <h1 className='title-md col-span-12 text-gray-500'>Seus produtos</h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Acesse gerencie a sua lista de produtos à venda
      </span>
      <div className='col-span-4 h-fit rounded-[20px] bg-white p-6'>
        <h2 className='title-sm mb-6 text-gray-300'>Filtrar</h2>

        <Input
          className='mb-5'
          id='search'
          IconLeft={Search01Icon}
          placeholder='Pesquisar'
        />
        <Select id='status' placeholder='Status' />
        <Button
          className='mt-10'
          onClick={() => {}}
          size='medium'
          stretch='full'
          type='solid'
        >
          Aplicar Filtro
        </Button>
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
