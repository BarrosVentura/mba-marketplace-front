import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
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
import { queryClient } from '@/query/query-client'
import { loader as productLoader } from '@/routes/productLoader'
import { getCategories } from '@/service/get-categories'
import { patchProductStatus } from '@/service/patch-product-status'
import { uploadImage } from '@/service/post-upload-image'
import { putEditProduct } from '@/service/put-edit-product'

const MAX_FILE_SIZE = 5000000
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
      if (files.length == 0) return true
      console.log({ imgSize: files[0].size, MAX_FILE_SIZE })
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, 'Tamanho máximo de 5mb ultrapassado')
    .refine((files) => {
      if (files.length == 0) return true
      return ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)
    }, 'Tipo de imagem inválido'),
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
  const currentStatus = data?.data.product.status
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
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

  const updateProduct = useMutation({
    mutationFn: putEditProduct,
    mutationKey: ['update-product', id]
  })

  const uploadImageFn = useMutation({
    mutationFn: uploadImage
  })

  const updateStatus = useMutation({
    mutationFn: patchProductStatus,
    mutationKey: ['update-status', id],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['product', id] })
    }
  })

  function handleUpdateProductForm(productData: UpdateProductSchema) {
    console.log(productData)
    if (productData.productImage[0]) {
      const imageFormData = new FormData()
      imageFormData.append('files', productData.productImage[0])
      uploadImageFn.mutate(imageFormData, {
        onSuccess({ data: successData }) {
          const selectedCategory = categories.data?.data.categories.find(
            (category) => productData.category == category.title
          )
          updateProduct.mutate({
            productData: {
              id: data?.data.product.id || '',
              description: productData.description,
              priceInCents: productData.price,
              title: productData.title,
              categoryId: selectedCategory?.id || '',
              attachmentsIds: [successData.attachments[0].id]
            }
          })
        }
      })
    } else {
      updateProduct.mutate({
        productData: {
          id: data?.data.product.id || '',
          description: productData.description,
          priceInCents: productData.price,
          title: productData.title,
          categoryId: data?.data.product.category.id ?? '',
          attachmentsIds: data?.data.product.attachments.map(
            (attach) => attach.id
          ) ?? ['']
        }
      })
    }
  }

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
          {currentStatus != 'cancelled' && (
            <Link
              onClick={() =>
                updateStatus.mutate({
                  aId: id ?? '',
                  status: currentStatus == 'sold' ? 'available' : 'sold'
                })
              }
              IconLeft={Tick01Icon}
            >
              {currentStatus == 'sold'
                ? 'Retomar anúncio'
                : 'Marcar como vendido'}
            </Link>
          )}
          {currentStatus != 'sold' && (
            <Link
              onClick={() =>
                updateStatus.mutate({
                  aId: id ?? '',
                  status:
                    currentStatus == 'cancelled' ? 'available' : 'cancelled'
                })
              }
              IconLeft={UnavailableIcon}
            >
              {currentStatus == 'cancelled'
                ? 'Reativar anúncio'
                : 'Desativar anúncio'}
            </Link>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(handleUpdateProductForm)}
        className='col-span-12 grid grid-cols-12 gap-6'
      >
        <UploadButton
          className='col-span-5'
          size='product'
          errorMessage={errors['productImage']?.message}
          imgSrc={data?.data.product.attachments[0]?.url}
          disabled={currentStatus != 'available'}
          {...register('productImage')}
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
              disabled={currentStatus != 'available'}
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
              disabled={currentStatus != 'available'}
              errorMessage={errors['price']?.message}
              {...register('price')}
            />
          </div>
          <div className='mb-5'>
            <Input
              placeholder='descrição do item'
              label='Descrição'
              id='description'
              disabled={currentStatus != 'available'}
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
              disabled={currentStatus != 'available'}
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
            <Button
              size='medium'
              stretch='full'
              type='solid'
              disabled={currentStatus != 'available'}
            >
              Salvar e atualizar
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}
