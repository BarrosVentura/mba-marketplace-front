import { api } from '@/lib/axios'

export function getViewCountPerDayMetric() {
  return api.get<{ viewsPerDay: { date: string; amount: number }[] }>(
    '/sellers/metrics/views/days'
  )
}
