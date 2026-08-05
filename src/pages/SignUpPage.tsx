import { type SubmitEvent, useState } from 'react'
import { signUp } from '../features/auth/api'

export const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError('')

      await signUp(email, password)

      setSuccess(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Что-то пошло не так')
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
      <h1>Регистрация</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Пароль</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Создаем...' : 'Создать аккаунт'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {success && (
        <p>
          Аккаунт создан 🎉
        </p>
      )}
    </div>
  )
}