import React, {useState}from 'react'
import { registerUser } from '../../services/api'
import './RegForm.scss'
import { Navigate, useNavigate } from 'react-router-dom'

const Regform = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if(formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
  }
    setLoading(true)
    setError('')

   try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
      console.log('User created:', data)

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      // alert('Registration successful!')
      navigate('/')
    } catch (err) {
      setError(err.message)
      console.log('Error, failed to register user', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="regform-container">
      <form id='reg-form' onSubmit={handleSubmit}>
      <h2>Register User</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
    </div>
  )
}

export default Regform