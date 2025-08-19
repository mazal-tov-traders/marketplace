import { useTranslation } from "react-i18next"
import { useTheme } from "@/contexts/ThemeContext"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Link } from "react-router-dom"
import { AuthDialog } from "@/components/AuthDialog"

export const Header = ({ cartItemsCount }) => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('marketplace-language', lng)
  }

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src={"/images/logo.svg"} alt="logo" className="header__logo-image" />
        </Link>

        {/* Right side controls */}
        <div className="header__controls">
          {/* Navigation */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link to="/" className="header__nav-link">
                  {t('nav.home')}
                </Link>
              </li>
              <li className="header__nav-item">
                <Link to="/add-product" className="header__nav-link">
                  {t('nav.products')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Language switcher */}
          <LanguageToggle
            currentLanguage={i18n.language}
            onLanguageChange={changeLanguage}
          />

          {/* Cart */}
          <Link to="/cart" className="cart-button">
            <img src="/images/cart-icon.svg" alt="cart" className="cart-button__icon" />
            {cartItemsCount > 0 && (
              <span className="cart-button__badge">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Auth Dialog */}
          <AuthDialog />

          {/* Theme toggle */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  )
}
