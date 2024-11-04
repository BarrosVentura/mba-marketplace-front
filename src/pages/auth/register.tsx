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
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { uploadUserAvatar } from '@/service/upload-user-avatar'
import { createUser } from '@/service/create-user'
import { useNavigate } from 'react-router-dom'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

const registerSchema = z
  .object({
    avatar: z
      .custom<File[]>()
      .refine((files) => {
        console.log(files)
        return files?.length == 1
      }, 'Avatar é obrigatório')
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        'Tamanho máximo de 5mb ultrapassado'
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        'Tipo de imagem inválido'
      ),
    name: z.string({
      required_error: 'Nome é obrigatório'
    }),
    phone: z
      .string({
        required_error: 'Telefone é obrigatório'
      })
      .max(12, {
        message: 'Telefone não pode passar de 12 caracteres'
      }),
    email: z
      .string({
        required_error: 'Email é obrigatório'
      })
      .email('Adicione um email válido'),
    password: z.string({
      required_error: 'Senha é obrigatório'
    }),
    passwordConfirmation: z.string({
      required_error: 'Confirmação de senha é obrigatório'
    })
  })
  .refine(
    ({ passwordConfirmation, password }) => passwordConfirmation === password,
    {
      message: 'Senhas devem ser iguais',
      path: ['passwordConfirmation']
    }
  )

type RegisterSchema = z.infer<typeof registerSchema>

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema)
  })
  const navigate = useNavigate()

  const createSeller = useMutation({
    mutationFn: createUser,
    onSuccess() {
      navigate('/login')
    }
  })

  const uploadImage = useMutation({
    mutationFn: uploadUserAvatar
  })

  function handleRegisterForm(userData: RegisterSchema) {
    const imageFormData = new FormData()
    imageFormData.append('files', userData.avatar[0])
    uploadImage.mutate(imageFormData, {
      onSuccess({ data }) {
        createSeller.mutate({
          ...userData,
          avatarId: data.attachments[0].id
        })
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterForm)}
      encType='multipart/form-data'
      className='flex min-w-[563px] flex-col gap-12 overflow-y-scroll rounded-[32px] bg-white px-20 py-[70px]'
    >
      <div>
        <h1 className='title-md'>Crie sua conta</h1>
        <p className='body-sm text-gray-300'>
          Informe os seus dados pessoais e de acesso
        </p>
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='title-sm text-gray-500'>Perfil</h2>
        <UploadButton
          size='user'
          {...register('avatar')}
          errorMessage={errors['avatar']?.message?.toString()}
        />
        <Input
          id='name'
          label='Nome'
          placeholder='Seu nome completo'
          IconLeft={UserIcon}
          {...register('name')}
          errorMessage={errors['name']?.message}
        />

        <Input
          id='phone'
          label='Telefone'
          placeholder='(00) 00000-0000'
          IconLeft={CallIcon}
          {...register('phone')}
          errorMessage={errors['phone']?.message}
        />
      </div>

      <div className='flex flex-col gap-3'>
        <h2 className='title-sm text-gray-500'>Acesso</h2>
        <Input
          id='email'
          label='E-mail'
          placeholder='Seu e-mail de acesso'
          IconLeft={Mail02Icon}
          {...register('email')}
          errorMessage={errors['email']?.message}
        />
        <Input
          id='password'
          label='Senha'
          placeholder='Senha de acesso'
          IconLeft={AccessIcon}
          toggleView
          {...register('password')}
          errorMessage={errors['password']?.message}
        />
        <Input
          id='confirm-password'
          label='Confirmar Senha'
          placeholder='Confirme a senha'
          IconLeft={AccessIcon}
          toggleView
          {...register('passwordConfirmation')}
          errorMessage={errors['passwordConfirmation']?.message}
        />
        <Button
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
