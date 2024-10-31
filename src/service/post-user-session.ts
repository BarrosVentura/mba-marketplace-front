import { api } from '@/lib/axios'

export function postUserSession({
  email,
  password
}: {
  email: string
  password: string
}) {
  return api.post<{ accessToken: string }>('sellers/sessions', {
    email,
    password
  })
}
