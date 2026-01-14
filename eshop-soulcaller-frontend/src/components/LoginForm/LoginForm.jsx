import React, {useState} from 'react'
import { loginUser } from '../../services/api'
import { useNavigate } from 'react-router-dom'
import './LoginForm.scss'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    })) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try{
      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      })
      console.log('User logged in:', data)

      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)
      

      setFormData({
        email: '',
        password: '',
      })
      navigate('/')
    } catch (err) {
      setError(err.message)
      console.log('Error, failed to login user', err)
    } finally {
      setLoading(false) 
    }
  }

  return (
    <div className="login-form-container">
      <form action="submit" id='login-form' onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button id='login-btn' type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
