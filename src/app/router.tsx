import { createBrowserRouter } from 'react-router-dom'

import { App } from '@/App'

import { DiaryPage } from '@/pages/DiaryPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignUpPage } from '@/pages/SignUpPage'

import { ProtectedRoute } from '@/components/ProtectedRoute'
import { GuestRoute } from '@/components/GuestRoute'
import { CreateEntryPage } from '@/pages/CreateEntryPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DiaryPage />,
      },
      {
        path: 'entries/new',
        element: <CreateEntryPage />,
      },
    ],
  },

  {
    path: '/login',
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },

  {
    path: '/sign-up',
    element: (
      <GuestRoute>
        <SignUpPage />
      </GuestRoute>
    ),
  },
])