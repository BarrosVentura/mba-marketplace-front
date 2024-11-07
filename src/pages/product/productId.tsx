import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft02Icon, Tick01Icon, UnavailableIcon } from 'hugeicons-react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useLoaderData, useParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { Select } from '@/components/Select'
import { Tag } from '@/components/Tag'
import { UploadButton } from '@/components/UploadButton'
import { queryProductById } from '@/query/product-query'
import { loader as productLoader } from '@/routes/productLoader'
import { getCategories } from '@/service/get-categories'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

const updateProductSchema = z.object({
  productImage: z
    .custom<File[]>()
    .refine((files) => {
      return files?.length == 1
    }, 'Avatar é obrigatório')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Tamanho máximo de 5mb ultrapassado'
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Tipo de imagem inválido'
    ),
  title: z.string({ required_error: 'Titulo é obrigatório' }),
  price: z.coerce
    .number()
    .nonnegative()
    .refine((value) => value / 100),
  description: z.string(),
  category: z.string({ required_error: 'Categoria é obrigatório' })
})

type UpdateProductSchema = z.infer<typeof updateProductSchema>

export function ProductPage() {
  const { id } = useParams()
  const initialData = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof productLoader>>
  >
  const { data } = useQuery({ ...queryProductById(id ?? ''), ...initialData })
  const {
    register,
    formState: { errors },
    setValue
  } = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      title: data?.data.product.title,
      price: data?.data.product.priceInCents,
      description: data?.data.product.description,
      category: data?.data.product.category.title
    }
  })

  const categories = useQuery({
    queryFn: getCategories,
    queryKey: ['categories']
  })

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
      <form className='col-span-12 grid grid-cols-12 gap-6'>
        <UploadButton
          className='col-span-5'
          size='product'
          errorMessage={errors['productImage']?.message}
          imgSrc={data?.data.product.attachments[0]?.url}
        />
        <div className='col-span-7 rounded-[20px] bg-white p-6'>
          <div className='mb-6 flex justify-between'>
            <h2 className='title-sm text-gray-300'>Dados do produto</h2>
            <Tag type={data?.data.product.status} />
          </div>
          <div className='mb-5 flex gap-[20px]'>
            <Input
              placeholder='Sofá'
              label='Título'
              id='title'
              className='flex-grow-[2]'
              errorMessage={errors['title']?.message}
              {...register('title')}
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
              errorMessage={errors['price']?.message}
              {...register('price')}
            />
          </div>
          <div className='mb-5'>
            <Input
              placeholder='descrição do item'
              label='Descrição'
              id='description'
              errorMessage={errors['description']?.message}
              {...register('description')}
            />
          </div>
          <div className='mb-10'>
            <Select
              id='category'
              placeholder='Selecione a categoria'
              label='Categoria'
              hideIcon
              options={categories.data?.data.categories.map(
                (category) => category.title
              )}
              initialValue={data?.data.product.category.title}
              onRemove={() => setValue('category', '')}
              {...register('category')}
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
            <Button size='medium' stretch='full' type='solid'>
              Salvar e atualizar
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
