import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="footer">
      {/* Top Section - Contact and Social Media */}
      <div className="footer__top">
        <div className="footer__container">
          {/* Left Side - Logo */}
          <div className="footer__logo">
            <div className="footer__logo-text">
              <span className="footer__logo-line">HOLY TRAFF</span>
              <span className="footer__logo-line">MARKET</span>
            </div>
          </div>

          {/* Middle Section - Call to Action */}
          <div className="footer__contact">
            <div className="footer__contact-text">
              <span className="footer__contact-white">ЗВ'ЯЗАТИСЬ</span>
              <span className="footer__contact-green">З НАМИ</span>
            </div>
          </div>

          {/* Right Side - Social Media and Contact Links */}
          <div className="footer__socials">
            <div className="footer__social-item">
              <img src="/images/youtube-icon.svg" alt="YouTube" className="footer__social-icon" />
            </div>
            <div className="footer__social-item">
              <img src="/images/instagram-icon.svg" alt="Instagram" className="footer__social-icon" />
            </div>
            <div className="footer__social-item">
              <img src="/images/telegram-icon.svg" alt="Telegram" className="footer__social-icon" />
              <span className="footer__social-text">@PR_HOLY</span>
            </div>
            <div className="footer__social-item">
              <img src="/images/tiktok-icon.svg" alt="TikTok" className="footer__social-icon" />
            </div>
            <div className="footer__social-item">
              <img src="/images/telegram-icon.svg" alt="Telegram" className="footer__social-icon" />
              <span className="footer__social-text">@HOLYAPPS</span>
            </div>
            <div className="footer__social-item">
              <img src="/images/email-icon.svg" alt="Email" className="footer__social-icon footer__social-icon--white" />
              <span className="footer__social-text">HOLY@GMAIL.COM</span>
            </div>
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
    </footer>
  )
}
