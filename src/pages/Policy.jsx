import { useTranslation } from "react-i18next"
import { Hero } from "../components/Hero"

export default function Policy() {
  const { t } = useTranslation()

  return (
    <div className="policy">
      <Hero />
      <div className="policy__inner page-width">
        <div className="policy__header">
          <h1 className="policy__header-title">
            {t('pages.policy', 'Terms & Conditions')}
          </h1>
        </div>
        
        <div className="policy__content">
          <div className="policy__section">
            <h2 className="policy__section-title">
              {t('policy.title', 'Terms & Conditions')}
            </h2>
            <p className="policy__section-text">
              {t('policy.description', 'This page is under construction. Terms and conditions content will be added soon.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
