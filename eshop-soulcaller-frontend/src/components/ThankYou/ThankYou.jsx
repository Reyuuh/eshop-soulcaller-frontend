import React from 'react'
import './ThankYou.scss'

const ThankYou = () => {
  return (
    <div className="thank-you-container">
        <h1>Thank You for Your Purchase!</h1>
        <p>We appreciate your business. Your order has been received and is being processed.</p>
        <p>A confirmation email has been sent to your registered email address.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Return to Home page: <a href="/">Here</a></p>
    </div>
  )
}

export default ThankYou