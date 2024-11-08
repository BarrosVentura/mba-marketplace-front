import { api } from '@/lib/axios'

interface Product {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export function putEditProduct({ productData }: { productData: Product }) {
  return api.put(`/products/${productData.id}`, {
    ...productData
  })
}
