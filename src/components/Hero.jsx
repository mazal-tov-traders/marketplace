import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Hero = () => {
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="hero__inner page-width">
      {/* Back button */}
      <div className="hero__back">
        <Link to="/" className="hero__back-link">
          <span className="hero__back-arrow"><img src="/images/arrow-back-icon.svg" alt="arrow-left" /></span>
          <span className="hero__back-text">{t('nav.back')}</span>
        </Link>
      </div>

      {/* Container */}
      
        {/* Main content */}
        <div className="hero__content">
          {/* Title */}
          <h1 className="hero__title">
            <span className="hero__title-part hero__title-part--white">HOLY TRAFF</span>
            <span className="hero__title-part hero__title-part--green">MARKET</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
