import { Status } from '@/@types/status'
import { api } from '@/lib/axios'

export function patchProductStatus({
  aId,
  status
}: {
  aId: string
  status: Status
}) {
  return api.patch(`/products/${aId}/${status}`)
}
