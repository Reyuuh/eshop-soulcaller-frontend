import React from 'react'
import './RegForm.scss'

const Regform = () => {
  return (
    <div className="regform-container">
      <form id='reg-form'>
      <h2>Register User</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" placeholder="Username" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Password" />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Regform