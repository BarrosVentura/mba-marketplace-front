import { api } from '@/lib/axios'

export function getViewCountMetric() {
  return api.get<{ amount: string }>('/sellers/metrics/views')
}
