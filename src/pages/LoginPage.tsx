import {
  Alert,
  Button,
  Card,
  Field,
  Flex,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { signIn } from '@/features/auth/api'
import { DemoSignInButton } from '@/components/DemoSignInButton'

interface LoginFormData {
  email: string
  password: string
}

export const LoginPage = () => {
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      await signIn(email, password)
    } catch (error) {
      setError('root', {
        message: error instanceof Error
          ? error.message
          : 'Не удалось выполнить вход',
      })
    }
  }

  return (
    <Flex
      minH="100dvh"
      align="center"
      justify="center"
      bg="bg.subtle"
      px="4"
      py="10"
    >
      <Card.Root width="full" maxW="md" shadow="lg">
        <Card.Header gap="2" textAlign="center">
          <Heading size="2xl">Вход</Heading>
          <Text color="fg.muted">
            Войдите, чтобы продолжить вести дневник эмоций
          </Text>
        </Card.Header>

        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap="5">
              <Field.Root required invalid={Boolean(errors.email)}>
                <Field.Label>
                  Email
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Введите email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Введите корректный email',
                    },
                  })}
                />
                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={Boolean(errors.password)}>
                <Field.Label>
                  Пароль
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Введите пароль"
                  {...register('password', {
                    required: 'Введите пароль',
                  })}
                />
                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
              </Field.Root>

              {errors.root?.message && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Description>{errors.root.message}</Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              )}

              <Button
                type="submit"
                width="full"
                loading={isSubmitting}
                loadingText="Входим..."
                disabled={isDemoSubmitting}
              >
                Войти
              </Button>

              <DemoSignInButton
                disabled={isSubmitting}
                onBeforeSignIn={() => clearErrors('root')}
                onPendingChange={setIsDemoSubmitting}
                onError={(message) => setError('root', { message })}
              />
            </Stack>
          </form>
        </Card.Body>

        <Card.Footer justifyContent="center">
          <Text color="fg.muted">
            Нет аккаунта?{' '}
            <ChakraLink asChild colorPalette="teal" fontWeight="medium">
              <Link to="/sign-up">Зарегистрироваться</Link>
            </ChakraLink>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Flex>
  )
}
