import { Button } from '@chakra-ui/react'
import { useState } from 'react'

import { signInAnonymously } from '@/features/auth/api'
import { Tooltip } from '@/components/ui/tooltip'

interface DemoSignInButtonProps {
  disabled?: boolean
  onBeforeSignIn?: () => void
  onError?: (message: string) => void
  onPendingChange?: (isPending: boolean) => void
}

export const DemoSignInButton = ({
  disabled,
  onBeforeSignIn,
  onError,
  onPendingChange,
}: DemoSignInButtonProps) => {
  const [isPending, setIsPending] = useState(false)

  const handleClick = async () => {
    onBeforeSignIn?.()
    setIsPending(true)
    onPendingChange?.(true)

    try {
      await signInAnonymously()
    } catch (error) {
      onError?.(
        error instanceof Error
          ? error.message
          : 'Не удалось войти в демо-режим',
      )
    } finally {
      setIsPending(false)
      onPendingChange?.(false)
    }
  }

  return (
    <Tooltip
      content="В демо-режиме можно пользоваться основными возможностями дневника. Данные сохраняются только для этой демо-сессии — после выхода доступ к ним будет потерян."
      contentProps={{ maxW: 'sm' }}
      openDelay={300}
      showArrow
    >
      <Button
        type="button"
        width="full"
        variant="outline"
        loading={isPending}
        loadingText="Открываем демо..."
        disabled={disabled}
        onClick={handleClick}
      >
        Попробовать демо
      </Button>
    </Tooltip>
  )
}
