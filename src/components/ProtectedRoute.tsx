import { Navigate } from 'react-router-dom'

import { useAuth } from '@/providers/useAuth'

type Props = {
  children: React.ReactNode
}

export const ProtectedRoute = ({
  children,
}: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}