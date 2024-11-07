import { api } from '@/lib/axios'

export function uploadImage(files: FormData) {
  return api.post<{ attachments: { id: string; url: string }[] }>(
    'attachments',
    files,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
