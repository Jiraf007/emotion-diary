import { useState } from 'react'
import { Link } from 'react-router-dom'

import { signIn } from '@/features/auth/api'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      await signIn(email, password)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Не удалось выполнить вход')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
      }}
    >
      <h1>Вход</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <br />

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">
            Пароль
          </label>

          <br />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Входим...'
            : 'Войти'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: 24 }}>
        Нет аккаунта?{' '}
        <Link to="/sign-up">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  )
}