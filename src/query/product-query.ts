import { getProductById } from '@/service/get-product-by-id'

export const queryProductById = (id: string) => ({
  queryKey: ['product', id],
  queryFn: () => getProductById(id)
})
