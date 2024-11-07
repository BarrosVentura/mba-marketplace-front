import { Status } from '@/@types/status'
import { api } from '@/lib/axios'

interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: Status
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: {
    id: string
    url: string
  }[]
}

export function getProductById(aId: string) {
  return api.get<{ product: Product }>(`/products/${aId}`)
}
