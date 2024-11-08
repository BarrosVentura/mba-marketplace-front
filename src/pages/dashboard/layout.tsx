import { useQuery } from '@tanstack/react-query'
import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'
import { Outlet, useNavigate } from 'react-router-dom'

import LogoOnly from '@/assets/logo-only.svg'
import { Button } from '@/components/Button'
import { MenuLink } from '@/components/MenuLink'
import { Profile } from '@/components/Profile'
import { getSellerProfile } from '@/service/get-seller-profile'

export function AppLayout() {
  const navigate = useNavigate()
  const seller = useQuery({
    queryFn: getSellerProfile,
    queryKey: ['seller-profile']
  })

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
        <div className='flex items-center gap-4'>
          <Button
            onClick={() => navigate('/create')}
            size='small'
            stretch='contain'
            type='solid'
            IconLeft={PlusSignIcon}
          >
            Novo produto
          </Button>
          <Profile
            name={seller.data?.data.seller.name ?? ''}
            src={
              seller.data?.data.seller?.avatar?.url ??
              'https://avatars.githubusercontent.com/u/28519534?v=4'
            }
          />
        </div>
      </header>
      <section className='m-auto mt-16 grid max-w-[1030px] grid-cols-12 gap-x-6'>
        <Outlet />
      </section>
    </main>
  )
}
