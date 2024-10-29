import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { UploadButton } from '@/components/UploadButton'
import {
  AccessIcon,
  ArrowRight02Icon,
  CallIcon,
  Mail02Icon,
  UserIcon
} from 'hugeicons-react'

export function RegisterPage() {
  return (
    <form className='flex min-w-[563px] flex-col gap-12 overflow-y-scroll rounded-[32px] bg-white px-20 py-[70px]'>
      <div>
        <h1 className='title-md'>Crie sua conta</h1>
        <p className='body-sm text-gray-300'>
          Informe os seus dados pessoais e de acesso
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='title-sm text-gray-500'>Perfil</h2>
        <UploadButton />
        <Input
          id='name'
          label='Nome'
          placeholder='Seu nome completo'
          IconLeft={UserIcon}
        />

        <Input
          id='phone'
          label='Telefone'
          placeholder='(00) 00000-0000'
          IconLeft={CallIcon}
        />
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='title-sm text-gray-500'>Acesso</h2>
        <Input
          id='email'
          label='E-mail'
          placeholder='Seu e-mail de acesso'
          IconLeft={Mail02Icon}
        />
        <Input
          id='password'
          label='Senha'
          placeholder='Senha de acesso'
          IconLeft={AccessIcon}
          toggleView
        />
        <Input
          id='confirm-password'
          label='Confirmar Senha'
          placeholder='Confirme a senha'
          IconLeft={AccessIcon}
          toggleView
        />
        <Button
          onClick={() => {}}
          size='medium'
          type='solid'
          stretch='full'
          IconRight={ArrowRight02Icon}
          className='mt-12'
        >
          Cadastrar
        </Button>
      </div>

      <div className='flex flex-1 flex-col justify-end gap-5'>
        <p className='body-md text-gray-300'>Já tem uma conta?</p>
        <Button
          onClick={() => {}}
          size='medium'
          type='outline'
          IconRight={ArrowRight02Icon}
          stretch='full'
        >
          Acessar
        </Button>
      </div>
    </form>
  )
}
