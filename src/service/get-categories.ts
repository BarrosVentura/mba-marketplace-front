import { api } from '@/lib/axios'

export function getCategories() {
  return api.get<{ categories: { id: string; title: string; slug: string }[] }>(
    '/categories'
  )
}
