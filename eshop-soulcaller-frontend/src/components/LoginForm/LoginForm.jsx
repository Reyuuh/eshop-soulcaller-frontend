import React from 'react'
import './LoginForm.scss'

const LoginForm = () => {
  return (
    <div className="login-form-container">
        <form action="submit" id='login-form'>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <button id='login-btn' type="submit">Login</button>
        </form>
    </div>
  )
}

export default LoginForm