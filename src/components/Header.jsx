import { useTranslation } from "react-i18next"
import { useTheme } from "@/contexts/ThemeContext"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Link } from "react-router-dom"
import { AuthDialog } from "@/components/AuthDialog"
import { useState, useEffect } from "react"

export const Header = ({ cartItemsCount }) => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    localStorage.setItem('marketplace-language', lng)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.header__mobile-menu') && !event.target.closest('.header__mobile-menu-btn')) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <img src={"/images/logo.svg"} alt="logo" className="header__logo-image" />
        </Link>

        {/* Right side controls */}
        <div className="header__controls">
          {/* Navigation - Desktop */}
          <nav className="header__nav header__nav--desktop">
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

          {/* Language switcher - Desktop */}
          <LanguageToggle
            currentLanguage={i18n.language}
            onLanguageChange={changeLanguage}
            className="header__language-toggle--desktop"
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

          {/* Theme toggle - Desktop */}
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="header__theme-toggle--desktop" />

          {/* Mobile Menu Button */}
          <button
            className="header__mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`header__mobile-menu-btn__hamburger ${isMobileMenuOpen ? 'header__mobile-menu-btn__hamburger--active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <div className="header__mobile-menu__content">
          {/* Mobile Navigation */}
          <nav className="header__nav header__nav--mobile">
            <ul className="header__nav-list header__nav-list--mobile">
              <li className="header__nav-item header__nav-item--mobile">
                <Link to="/add-product" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                  {t('nav.createAd')}
                </Link>
              </li>
              <li className="header__nav-item header__nav-item--mobile">
                <Link to="/profile" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                  {t('nav.profile')}
                </Link>
              </li>
              <li className="header__nav-item header__nav-item--mobile">
                <Link to="/favorites" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                  {t('nav.favorites')}
                </Link>
              </li>
              <li className="header__nav-item header__nav-item--mobile">
                <Link to="/cart" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                  {t('nav.cart')}
                </Link>
              </li>
              <li className="header__nav-item header__nav-item--mobile">
                <Link to="/contacts" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                  {t('nav.contacts')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Language Switcher */}
          <div className="header__mobile-language-toggle">
            <button
              onClick={() => changeLanguage('en')}
              className={`header__mobile-language-toggle__option ${i18n.language === 'en' ? 'header__mobile-language-toggle__option--active' : ''}`}
            >
              EN
            </button>
            <span className="header__mobile-language-toggle__separator">|</span>
            <button
              onClick={() => changeLanguage('ua')}
              className={`header__mobile-language-toggle__option ${i18n.language === 'ua' ? 'header__mobile-language-toggle__option--active' : ''}`}
            >
              UA
            </button>
          </div>

          {/* Mobile Theme Toggle */}
          <button
            className="header__mobile-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <div className="header__mobile-theme-toggle__container">
              <div className={`header__mobile-theme-toggle__icon ${theme === 'light' ? 'header__mobile-theme-toggle__icon--active' : ''}`}>
                <img src={"/images/sun-icon.svg"} alt="sun" className="header__mobile-theme-toggle__sun" />
              </div>
              <div className={`header__mobile-theme-toggle__icon ${theme === 'dark' ? 'header__mobile-theme-toggle__icon--active' : ''}`}>
                <img src={"/images/moon-icon.svg"} alt="moon" className="header__mobile-theme-toggle__moon" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
