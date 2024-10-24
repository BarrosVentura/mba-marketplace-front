import { LoginPage } from '@/pages/login'
import { createBrowserRouter } from 'react-router-dom'
import { RootLogin } from './RootLogin'
import { RegisterPage } from '@/pages/register'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLogin,
    children: [
      {
        index: true,
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
