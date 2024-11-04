import { Input } from '@/components/Input'
import { Mail02Icon, AccessIcon, ArrowRight02Icon } from 'hugeicons-react'
import { Button } from '@/components/Button'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { postUserSession } from '@/service/post-user-session'
import { useSessionStorage } from '@/hooks/useSessionStorage'

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .email('Digite um e-mail válido'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(6, 'Senha deve ter no minimo 6 digitos')
})

type LoginSchema = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { setSessionToken } = useSessionStorage()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const login = useMutation({
    mutationFn: postUserSession,
    onSuccess({ data: { accessToken } }) {
      setSessionToken(accessToken)
      navigate('/')
    }
  })

  function handleSubmitForm(data: LoginSchema) {
    login.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className='flex min-w-[563px] flex-col gap-12 rounded-[32px] bg-white px-20 py-[70px]'
    >
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
          errorMessage={errors['email']?.message}
          {...register('email')}
        />

        <Input
          id='password'
          label='senha'
          placeholder='Sua senha de acesso'
          IconLeft={AccessIcon}
          toggleView
          errorMessage={errors['password']?.message}
          {...register('password')}
        />
      </div>

      <div>
        <Button
          size='medium'
          type='solid'
          stretch='full'
          IconRight={ArrowRight02Icon}
          isLoading={login.isPending}
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
