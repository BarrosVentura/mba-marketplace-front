import { Outlet } from 'react-router-dom'
import LogoOnly from '@/assets/logo-only.svg'
import { Button } from '@/components/Button'
import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'
import { MenuLink } from '@/components/MenuLink'

export function RootDash() {
  return (
    <main className='min-h-screen bg-background'>
      <header className='flex items-center justify-between border-b border-shape p-5'>
        <img src={LogoOnly} alt='' />
        <nav className='flex gap-2'>
          <MenuLink IconLeft={ChartHistogramIcon} to='/'>
            Dashboard
          </MenuLink>
          <MenuLink IconLeft={PackageIcon} to='/products'>
            Produtos
          </MenuLink>
        </nav>
        <div className='flex gap-4'>
          <Button
            onClick={() => {}}
            size='small'
            stretch='contain'
            type='solid'
            IconLeft={PlusSignIcon}
          >
            Novo produto
          </Button>
          <div className='h-12 w-12 overflow-hidden rounded-xl'>
            <img
              className='h-auto max-h-full'
              src='https://avatars.githubusercontent.com/u/28519534?v=4'
              alt=''
            />
          </div>
        </div>
      </header>
      <section className='m-auto mt-16 grid max-w-[1030px] grid-cols-12 gap-x-6'>
        <Outlet />
      </section>
    </main>
  )
}
