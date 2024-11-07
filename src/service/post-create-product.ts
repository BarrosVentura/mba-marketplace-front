import { api } from '@/lib/axios'

interface Product {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export function createProduct(product: Product) {
  return api.post('/products', {
    ...product
  })
}
