import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__section">
          <a className="footer__logo" href="/">Soulcaller</a>
          <p className="footer__description">
            Discover unique soul-bound artifacts and mystical treasures for your spiritual journey.
          </p>
        </div>
        
        <nav className="footer__nav">
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/shipping">Shipping</a></li>
            <li><a href="/returns">Returns</a></li>
          </ul>
        </nav>
        
        <div className="footer__section">
          <h4>Follow Us</h4>
          <div className="footer__social">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__container">
          <p>&copy; 2026 Soulcaller. All rights reserved.</p>
          <div className="footer__legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer