import { LoginPage } from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
import { RootLogin } from './RootLogin'
import { RegisterPage } from '@/pages/register'
import { RootDash } from './RootDash'
import { HomePage } from '@/pages'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootDash,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  },
  {
    path: '/login',
    Component: RootLogin,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
])
