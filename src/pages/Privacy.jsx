import { useTranslation } from "react-i18next"
import { Hero } from "../components/Hero"

export default function Privacy() {
  const { t } = useTranslation()

  return (
    <div className="privacy">
      <Hero />
      <div className="privacy__inner page-width">
        <div className="privacy__header">
          <h1 className="privacy__header-title">
            {t('pages.privacy', 'Privacy Policy')}
          </h1>
        </div>
        
        <div className="privacy__content">
          <div className="privacy__section">
            <h2 className="privacy__section-title">
              {t('privacy.title', 'Privacy Policy')}
            </h2>
            <p className="privacy__section-text">
              {t('privacy.description', 'This page is under construction. Privacy policy content will be added soon.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
