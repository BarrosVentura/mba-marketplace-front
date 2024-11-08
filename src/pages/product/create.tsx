import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { UploadButton } from '@/components/UploadButton'
import { getCategories } from '@/service/get-categories'
import { createProduct } from '@/service/post-create-product'
import { uploadImage } from '@/service/post-upload-image'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

const createProductSchema = z.object({
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

type CreateProductSchema = z.infer<typeof createProductSchema>

export function CreateProductPage() {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema)
  })
  const createProductFn = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      navigate('/products')
    }
  })

  const uploadImageFn = useMutation({
    mutationFn: uploadImage
  })
  const categories = useQuery({
    queryFn: getCategories,
    queryKey: ['categories']
  })

  function handleCreateForm(productData: CreateProductSchema) {
    const imageFormData = new FormData()
    imageFormData.append('files', productData.productImage[0])
    uploadImageFn.mutate(imageFormData, {
      onSuccess({ data }) {
        const selectedCategory = categories.data?.data.categories.find(
          (category) => productData.category == category.title
        )
        createProductFn.mutate({
          description: productData.description,
          priceInCents: productData.price,
          title: productData.title,
          categoryId: selectedCategory?.id || '',
          attachmentsIds: [data.attachments[0].id]
        })
      }
    })
  }

  return (
    <>
      <h1 className='title-md col-span-12 text-gray-500'>Novo produto</h1>
      <span className='body-sm col-span-12 mb-10 text-gray-300'>
        Cadastre um produto para venda no marketplace
      </span>

      <form
        onSubmit={handleSubmit(handleCreateForm)}
        className='col-span-12 grid grid-cols-12 gap-6'
      >
        <UploadButton
          className='col-span-5'
          size='product'
          errorMessage={errors['productImage']?.message?.toString()}
          {...register('productImage')}
        />
        <div className='col-span-7 rounded-[20px] bg-white p-6'>
          <h2 className='title-sm mb-6 text-gray-300'>Dados do produto</h2>
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
              onRemove={() => setValue('category', '')}
              options={categories.data?.data.categories.map(
                (category) => category.title
              )}
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
