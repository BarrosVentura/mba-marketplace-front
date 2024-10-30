import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { Select } from '@/components/Select'
import { ArrowLeft02Icon, Tick01Icon, UnavailableIcon } from 'hugeicons-react'
import { useParams, Link as RouterLink } from 'react-router-dom'

export function ProductPage() {
  const { id } = useParams()

  return (
    <>
      <Link asChild>
        <RouterLink to='/products' className='col-span-12 mb-2 flex'>
          <ArrowLeft02Icon /> Voltar
        </RouterLink>
      </Link>
      <h1 className='title-md col-span-12 text-gray-500'>Editar produto</h1>
      <div className='col-span-12 mb-10 flex items-end justify-between'>
        <span className='body-sm text-gray-300'>
          Gerencie as informações do produto cadastrado
        </span>
        <div className='flex gap-4'>
          <Link IconLeft={Tick01Icon}>Marcar como vendido</Link>
          <Link IconLeft={UnavailableIcon}>Desativar anúncio</Link>
        </div>
      </div>
      <img
        className='col-span-5 h-[340px] w-full object-cover'
        src='https://placehold.co/600x400'
        alt=''
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
