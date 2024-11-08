import { useMutation } from '@tanstack/react-query'
import { Logout01Icon } from 'hugeicons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { postLogoutSeller } from '@/service/post-logout-seller'

export function Profile({ src, name }: { src: string; name: string }) {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const signOut = useMutation({
    mutationFn: postLogoutSeller,
    mutationKey: ['sign-out'],
    onSuccess() {
      navigate('/login')
    }
  })

  return (
    <div className='relative h-12'>
      <button
        className='h-12 w-12 overflow-hidden rounded-xl'
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <img className='h-auto max-h-full' src={src} alt='' />
      </button>

      {dropdownOpen && (
        <div className='absolute right-0 h-[130px] w-[168px] rounded-xl bg-white p-4'>
          <div className='mb-5 flex items-center gap-3 border-b border-b-shape pb-5'>
            <img className='h-8 w-8 rounded-lg' src={src} alt='' />
            <p>{name}</p>
          </div>
          <div>
            <button
              className='flex w-full justify-between text-orange-base'
              onClick={() => signOut.mutate()}
            >
              Sair
              <Logout01Icon />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
