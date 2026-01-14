import React from 'react';
import './ThankYou.scss';

const ThankYou = () => {
  return (
    <div className="thank-you-container">
      <div className="fireworks">
        {/* Firework bursts */}
        <div className="firework firework-1"></div>
        <div className="firework firework-2"></div>
        <div className="firework firework-3"></div>
        <div className="firework firework-4"></div>
        <div className="firework firework-5"></div>
        <div className="firework firework-6"></div>
        <div className="firework firework-7"></div>
        {/* Sparkles for extra effect */}
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
      </div>
      <div className="thank-you-content">
        <h1>Thank You for Your Purchase!</h1>
        <p>We appreciate your business. Your order has been received and is being processed.</p>
        <p>A confirmation email has been sent to your registered email address.</p>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Return to Home page: <a href="/">Here</a></p>
      </div>
    </div>
  );
};

export default ThankYou;