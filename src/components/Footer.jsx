import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top Section - Contact and Social Media */}
        <div className="footer__top">
          <div className="footer__content">
            {/* Left Side - Logo */}
            <Link to="/" className="footer__logo">
              <img src={"/images/logo.svg"} alt="logo" className="footer__logo-image" />
            </Link>

            {/* Middle Section - Call to Action */}
            <div className="footer__contact">
              <div className="footer__contact-text">
                <span className="footer__contact-text-white">{t('footer.contactUs')}</span>
                <span className="footer__contact-text-green">{t('footer.withUs')}</span>
              </div>
            </div>

            {/* Right Side - Social Media and Contact Links */}
            <div className="footer__socials footer__socials-icon-link">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <img src="/images/youtube-icon.svg" alt="YouTube" className="footer__social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <img src="/images/instagram-icon.svg" alt="Instagram" className="footer__social-icon" />
              </a>
              <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <img src="/images/telegram-icon.svg" alt="Telegram" className="footer__social-icon" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <img src="/images/tiktok-icon.svg" alt="TikTok" className="footer__social-icon" />
              </a>
            </div>
            
            <div className="footer__socials footer__socials--contact">
              <a href="https://t.me/PR_HOLY" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <img src="/images/tg-white-icon.svg" alt="Telegram" className="footer__social-icon footer__social-icon--white" />
                <span className="footer__social-text">@PR_HOLY</span>
              </a>
              <a href="https://t.me/HOLYAPPS" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                <img src="/images/tg-white-icon.svg" alt="Telegram" className="footer__social-icon footer__social-icon--white" />
                <span className="footer__social-text">@HOLYAPPS</span>
              </a>
              <a href="mailto:HOLY@GMAIL.COM" className="footer__social-link">
                <img src="/images/email-icon.svg" alt="Email" className="footer__social-icon footer__social-icon--white" />
                <span className="footer__social-text">HOLY@GMAIL.COM</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Repeating Text Pattern */}
        <div className="footer__bottom">
          <div className="footer__marquee">
            <div className="footer__marquee-content">
              {/* First set */}
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              {/* Duplicate for seamless loop */}
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
              <img src="/images/holy-traff.svg" alt="HOLY TRAFF" className="footer__marquee-text" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
