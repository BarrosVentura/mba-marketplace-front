import Logo from '../assets/Logo.svg'
import Backdrop from '../assets/Background.png'
import { Input } from '@/components/Input'
import { Mail02Icon, AccessIcon } from 'hugeicons-react'
import { Button } from '@/components/Button'

export function LoginPage() {
  return (
    <main className='flex h-screen w-screen gap-[24px] bg-background p-6'>
      <div className='flex flex-1 flex-col'>
        <div>
          <img src={Logo} alt='' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <img className='h-auto w-full max-w-[755px]' src={Backdrop} alt='' />
        </div>
      </div>
      <form className='min-w-[563px] rounded-[32px] bg-white px-20 py-[70px]'>
        <div className='mb-12'>
          <h1 className='title-md'>Acesse sua conta</h1>
          <p className='body-sm text-gray-300'>
            Informe seu e-mail e senha para entrar
          </p>
        </div>

        <div className='mb-12 flex flex-col gap-3'>
          <Input
            id='email'
            label='E-mail'
            placeholder='Seu e-mail cadastrado'
            IconLeft={Mail02Icon}
          />

          <Input
            id='password'
            label='senha'
            placeholder='Sua senha de acesso'
            IconLeft={AccessIcon}
            toggleView
          />
        </div>

        <div>
          <Button />
        </div>
      </form>
    </main>
  )
}
