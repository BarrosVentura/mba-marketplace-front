import { api } from '@/lib/axios'

interface Seller {
  id: string
  name: string
  phone: string
  email: string
  avatar: {
    id: string
    url: string
  } | null
}

export function getSellerProfile() {
  return api.get<{ seller: Seller }>('/sellers/me')
}
