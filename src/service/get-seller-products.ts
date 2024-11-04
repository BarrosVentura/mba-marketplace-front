import { api } from '@/lib/axios'

interface Product {
  id: string
  title: string
  description: string
  priceInCents: number
  status: 'available' | 'sold' | 'disabled'
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

export function getSellerProducts() {
  return api.get<{ products: Product[] }>('/products/me')
}
