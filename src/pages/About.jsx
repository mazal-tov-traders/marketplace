import { useTranslation } from "react-i18next"
import { Hero } from "../components/Hero"

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="about">
      <Hero />
      <div className="about__inner page-width">
        <div className="about__header">
          <h1 className="about__header-title">
            {t('pages.about', 'About Us')}
          </h1>
        </div>
        
        <div className="about__content">
          <div className="about__section">
            <h2 className="about__section-title">
              {t('about.title', 'About Us')}
            </h2>
            <p className="about__section-text">
              {t('about.description', 'This page is under construction. About us content will be added soon.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
