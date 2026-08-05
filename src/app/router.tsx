import { createBrowserRouter } from 'react-router-dom'

import { App } from '../App'

import { DiaryPage } from '../pages/DiaryPage'
import { LoginPage } from '../pages/LoginPage'
import { SignUpPage } from '../pages/SignUpPage'

import { ProtectedRoute } from '../components/ProtectedRoute'
import { GuestRoute } from '../components/GuestRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DiaryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <GuestRoute>
            <SignUpPage />
          </GuestRoute>
        ),
      },
    ],
  },
])