import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Search01Icon } from 'hugeicons-react'

export function ProductsPage() {
  return (
    <>
      <h1 className='title-md col-span-12 text-gray-500'>Seus produtos</h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Acesse gerencie a sua lista de produtos à venda
      </span>
      <div className='col-span-3 rounded-[20px] bg-white p-6'>
        <h2 className='title-sm text-gray-300'>Filtrar</h2>
        <Input id='search' IconLeft={Search01Icon} placeholder='Pesquisar' />
        <Select />
      </div>
      <div className='col-span-9'>teste</div>
    </>
  )
}
