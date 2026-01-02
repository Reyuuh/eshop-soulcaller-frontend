import React from 'react'
import './RegForm.scss'

const Regform = () => {
  return (
    <div className="regform-container">
      <form id='reg-form'>
      <h2>Register User</h2>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Regform