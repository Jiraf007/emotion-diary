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

import { signUp } from '@/features/auth/api'
import { DemoSignInButton } from '@/components/DemoSignInButton'

interface SignUpFormData {
  email: string
  password: string
}

export const SignUpPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async ({ email, password }: SignUpFormData) => {
    setIsSuccess(false)

    try {
      await signUp(email, password)
      setIsSuccess(true)
    } catch (error) {
      setError('root', {
        message: error instanceof Error
          ? error.message
          : 'Не удалось создать аккаунт',
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
          <Heading size="2xl">Регистрация</Heading>
          <Text color="fg.muted">
            Создайте аккаунт, чтобы начать вести дневник эмоций
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
                  autoComplete="new-password"
                  placeholder="Придумайте пароль"
                  {...register('password', {
                    required: 'Введите пароль',
                    minLength: {
                      value: 6,
                      message: 'Пароль должен содержать минимум 6 символов',
                    },
                  })}
                />
                <Field.HelperText>Минимум 6 символов</Field.HelperText>
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

              {isSuccess && (
                <Alert.Root status="success">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Description>
                      Аккаунт успешно создан
                    </Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              )}

              <Button
                type="submit"
                width="full"
                loading={isSubmitting}
                loadingText="Создаём..."
                disabled={isDemoSubmitting}
              >
                Создать аккаунт
              </Button>

              <DemoSignInButton
                disabled={isSubmitting}
                onBeforeSignIn={() => {
                  clearErrors('root')
                  setIsSuccess(false)
                }}
                onPendingChange={setIsDemoSubmitting}
                onError={(message) => setError('root', { message })}
              />
            </Stack>
          </form>
        </Card.Body>

        <Card.Footer justifyContent="center">
          <Text color="fg.muted">
            Уже есть аккаунт?{' '}
            <ChakraLink asChild colorPalette="teal" fontWeight="medium">
              <Link to="/login">Войти</Link>
            </ChakraLink>
          </Text>
        </Card.Footer>
      </Card.Root>
    </Flex>
  )
}
