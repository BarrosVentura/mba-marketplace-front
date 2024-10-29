import { LoginPage } from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
import { RootLogin } from './RootLogin'
import { RegisterPage } from '@/pages/register'
import { RootDash } from './RootDash'
import { HomePage } from '@/pages'
import { ProductsPage } from '@/pages/produtcs'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootDash,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        element: <ProductsPage />
      }
    ]
  },
  {
    path: '/',
    Component: RootLogin,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
])
