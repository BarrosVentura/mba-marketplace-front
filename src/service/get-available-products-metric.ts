import { api } from '@/lib/axios'

export function getAvailableProductsMetric() {
  return api.get<{ amount: string }>('/sellers/metrics/products/available')
}
