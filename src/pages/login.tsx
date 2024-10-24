import { Input } from '@/components/Input'
import { Mail02Icon, AccessIcon, ArrowRight02Icon } from 'hugeicons-react'
import { Button } from '@/components/Button'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <form className='flex min-w-[563px] flex-col gap-12 rounded-[32px] bg-white px-20 py-[70px]'>
      <div>
        <h1 className='title-md'>Acesse sua conta</h1>
        <p className='body-sm text-gray-300'>
          Informe seu e-mail e senha para entrar
        </p>
      </div>

      <div className='flex flex-col gap-3'>
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
        <Button
          onClick={() => {}}
          size='medium'
          type='solid'
          stretch='full'
          IconRight={ArrowRight02Icon}
        >
          Acessar
        </Button>
      </div>

      <div className='flex flex-1 flex-col justify-end gap-5'>
        <p className='body-md text-gray-300'>Ainda não tem uma conta?</p>
        <Button
          onClick={() => navigate('/register')}
          size='medium'
          type='outline'
          IconRight={ArrowRight02Icon}
          stretch='full'
        >
          Cadastrar
        </Button>
      </div>
    </form>
  )
}
