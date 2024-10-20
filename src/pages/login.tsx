import Logo from '../assets/Logo.svg'
import Backdrop from '../assets/Background.png'

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
      <form className='bg-white px-20 py-[70px]'>
        <h1 className='title-md'>Acesse sua conta</h1>
        <p className='body-sm text-gray-300'>
          Informe seu e-mail e senha para entrar
        </p>
      </form>
    </main>
  )
}
