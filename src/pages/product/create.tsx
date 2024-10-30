import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { UploadButton } from '@/components/UploadButton'
import { useParams } from 'react-router-dom'

export function CreateProductPage() {
  const { id } = useParams()

  return (
    <>
      <h1 className='title-md col-span-12 text-gray-500'>Novo produto</h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Cadastre um produto para venda no marketplace
      </span>

      <UploadButton
        // imgSrc='https://placehold.co/600x400'
        className='col-span-5'
        size='product'
      />
      <form className='col-span-7 rounded-[20px] bg-white p-6'>
        <h2 className='title-sm mb-6 text-gray-300'>Dados do produto</h2>
        <div className='mb-5 flex gap-[20px]'>
          <Input
            placeholder='Sofá'
            label='Título'
            id='title'
            className='flex-grow-[2]'
          />
          <Input
            placeholder='100'
            label='Valor'
            id='price'
            customIcon={
              <span className='body-md absolute top-[50%] z-0 translate-y-[-50%] text-orange-base'>
                R$
              </span>
            }
          />
        </div>
        <div className='mb-5'>
          <Input
            placeholder='descrição do item'
            label='Descrição'
            id='description'
          />
        </div>
        <div className='mb-10'>
          <Select
            id='category'
            placeholder='Selecione a categoria'
            label='Categoria'
            hideIcon
          />
        </div>
        <div className='flex gap-3'>
          <Button
            onClick={() => {}}
            size='medium'
            stretch='full'
            type='outline'
          >
            Cancelar
          </Button>
          <Button onClick={() => {}} size='medium' stretch='full' type='solid'>
            Salvar e atualizar
          </Button>
        </div>
      </form>
      {id}
    </>
  )
}
