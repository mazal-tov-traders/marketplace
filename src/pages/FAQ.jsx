import { useTranslation } from "react-i18next"
import { Hero } from "../components/Hero"

export default function FAQ() {
  const { t } = useTranslation()

  return (
    <div className="faq">
      <Hero />
      <div className="faq__inner page-width">
        <div className="faq__header">
          <h1 className="faq__header-title">
            {t('pages.faq', 'Frequently Asked Questions')}
          </h1>
        </div>
        
        <div className="faq__content">
          <div className="faq__section">
            <h2 className="faq__section-title">
              {t('faq.title', 'Frequently Asked Questions')}
            </h2>
            <p className="faq__section-text">
              {t('faq.description', 'This page is under construction. FAQ content will be added soon.')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
