import { LoginLayout } from '@/pages/auth/layout'
import { LoginPage } from '@/pages/auth/login'
import { RegisterPage } from '@/pages/auth/register'
import { HomePage } from '@/pages/dashboard'
import { AppLayout } from '@/pages/dashboard/layout'
import { ProductsPage } from '@/pages/product'
import { CreateProductPage } from '@/pages/product/create'
import { ProductPage } from '@/pages/product/productId'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'products',
        element: <ProductsPage />
      },
      {
        path: 'product/:id',
        element: <ProductPage />
      },
      {
        path: 'create',
        element: <CreateProductPage />
      }
    ]
  },
  {
    path: '/',
    Component: LoginLayout,
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
