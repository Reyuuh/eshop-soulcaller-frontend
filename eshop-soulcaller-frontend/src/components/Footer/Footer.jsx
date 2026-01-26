import React from 'react';
import './Footer.scss';

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
        
        <div className="footer__section">
           <h4>Follow Us!</h4>
          <div className="footer__social">
           
            {/* YouTube */}
            <a href="#" aria-label="YouTube" className="footer__youtube">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21.8 8.001a2.75 2.75 0 0 0-1.93-1.947C18.23 5.5 12 5.5 12 5.5s-6.23 0-7.87.554A2.75 2.75 0 0 0 2.2 8.001C1.75 9.653 1.75 12 1.75 12s0 2.347.45 3.999a2.75 2.75 0 0 0 1.93 1.947C5.77 18.5 12 18.5 12 18.5s6.23 0 7.87-.554a2.75 2.75 0 0 0 1.93-1.947C22.25 14.347 22.25 12 22.25 12s0-2.347-.45-3.999zM10.5 14.75v-5.5L15 12l-4.5 2.75z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="footer__instagram">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  ry="5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="17"
                  cy="7"
                  r="1.2"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Discord */}
            <a href="#" aria-label="Discord" className="footer__discord">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249-1.835-.275-3.65-.275-5.453 0-.164-.393-.405-.874-.617-1.249a.076.076 0 0 0-.079-.037c-1.69.326-3.345.846-4.885 1.515a.07.07 0 0 0-.032.028C.533 9.214-.32 13.94.099 18.602a.082.082 0 0 0 .031.056c2.052 1.507 4.041 2.422 5.992 3.029a.076.076 0 0 0 .084-.028c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.105c-.652-.247-1.27-.549-1.866-.892a.076.076 0 0 1-.007-.127c.125-.094.251-.192.371-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.372.292a.076.076 0 0 1-.006.127 12.298 12.298 0 0 1-1.867.891.076.076 0 0 0-.04.106c.36.699.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029c1.957-.606 3.946-1.521 5.998-3.03a.077.077 0 0 0 .031-.055c.5-5.177-.838-9.873-3.548-14.206a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.947 2.419-2.157 2.419z" />
              </svg>
            </a>
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
  );
};

export default Footer;
