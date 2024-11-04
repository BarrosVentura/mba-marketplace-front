import { api } from '@/lib/axios'

export function getSoldProductsMetric() {
  return api.get<{ amount: string }>('/sellers/metrics/products/sold')
}
