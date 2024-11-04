import { api } from '@/lib/axios'

interface UserData {
  name: string
  phone: string
  email: string
  avatarId: string
  password: string
  passwordConfirmation: string
}

interface UserReturn {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
}

export function createUser(userData: UserData) {
  return api.post<UserReturn>('/sellers', {
    ...userData
  })
}
