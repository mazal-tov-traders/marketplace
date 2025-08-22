import { useTranslation } from "react-i18next"
import { Hero } from "../components/Hero"

export default function HelpCenter() {
  const { t } = useTranslation()

  return (
    <div className="help-center">
      <Hero />
      <div className="help-center__inner page-width">
        <div className="help-center__header">
          <h1 className="help-center__header-title">
            {t('pages.helpCenter', 'Help Center')}
          </h1>
        </div>
        
        <div className="help-center__content">
          <div className="help-center__section">
            <h2 className="help-center__section-title">
              {t('helpCenter.title', 'Help Center')}
            </h2>
            <p className="help-center__section-text">
              {t('helpCenter.description', 'This page is under construction. Help center content will be added soon.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
