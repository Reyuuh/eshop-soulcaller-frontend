import React from 'react'
import './PaymentForm.scss'

const PaymentForm = () => {
  return (
    <div className="payment-form-container">
        <form action="submit" id='payment-form'>
            <h2>Payment Information</h2>
            <label htmlFor="name">Name on Card:</label>
            <input type="text" id="name" placeholder="Name on Card" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Email" required />
            <label htmlFor="adress">Address:</label>
            <input type="text" id="adress" placeholder="Address" required />
            <label htmlFor="expiry-date">Expiry Date:</label>
            <input type="text" id="expiry-date" placeholder="MM/YY" required />   
            <label htmlFor="cvv">CVV:</label>
            <input type="text" id="cvv" placeholder="CVV" required />
            <label htmlFor="card-number">Card Number:</label>
            <input type="text" id="card-number" placeholder="Card Number" required />   
            <button id='login-btn' type="submit">Confirm</button>
        </form>
    </div>
  )
}

export default PaymentForm