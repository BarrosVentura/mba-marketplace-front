import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/assets/Logo.svg'
import Backdrop from '@/assets/Background.png'
import { useEffect } from 'react'

export function LoginLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname == '/' || location.pathname == '') {
      navigate('/login')
    }
  }, [location.pathname, navigate])

  return (
    <main className='fixed flex h-screen w-screen gap-[24px] bg-background p-6'>
      <div className='flex flex-1 flex-col'>
        <div>
          <img src={Logo} alt='' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <img className='h-auto w-full max-w-[755px]' src={Backdrop} alt='' />
        </div>
      </div>
      <Outlet />
    </main>
  )
}
