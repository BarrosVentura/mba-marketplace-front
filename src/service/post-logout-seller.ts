import { api } from '@/lib/axios'

export function postLogoutSeller() {
  return api.post('/sign-out')
}
