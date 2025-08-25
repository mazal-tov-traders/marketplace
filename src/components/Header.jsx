import { useTranslation } from "react-i18next"
import { useTheme } from "@/contexts/ThemeContext"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { Link, useNavigate } from "react-router-dom"

import { useState, useEffect } from "react"

export const Header = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { getTotalItems } = useCart()
  const { currentUser, userProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false)

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

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      closeMobileMenu()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Close mobile menu and account popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu
      if (isMobileMenuOpen && !event.target.closest('.header__mobile-menu') && !event.target.closest('.header__mobile-menu-btn')) {
        setIsMobileMenuOpen(false)
      }
      
      // Close account popup
      if (isAccountPopupOpen && !event.target.closest('.header__account-popup') && !event.target.closest('.header__account-button')) {
        setIsAccountPopupOpen(false)
      }
    }

    if (isMobileMenuOpen || isAccountPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen, isAccountPopupOpen])

  return (
    <header className="header">
      <div className="header__inner page-width">
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

          {/* Heart button */}
          <button className="header__heart-button" title={t('nav.favorites', 'Избранное')}>
            <img src="/images/heart-icon.svg" alt="favorites" className="header__heart-button__icon" />
          </button>

          {/* Account button */}
          <button 
            className="header__account-button" 
            onClick={() => setIsAccountPopupOpen(!isAccountPopupOpen)}
            title={currentUser ? t('nav.profile', 'Профиль') : t('auth.signIn', 'Войти')}
          >
            <img src="/images/account-icon.svg" alt="account" className="header__account-button__icon" />
          </button>

          {/* Cart */}
          <Link to="/cart" className="cart-button">
            <img src="/images/cart-icon.svg" alt="cart" className="cart-button__icon" />
            {getTotalItems() > 0 && (
              <span className="cart-button__badge">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {/* Auth Section moved to Account Popup */}

          {/* Account Popup */}
          {isAccountPopupOpen && (
            <div className="header__account-popup">
              <div className="header__account-popup__content">
                {currentUser ? (
                  // User Profile Popup
                  <div className="header__account-popup__profile">
                    <div className="header__account-popup__user-info">
                      {userProfile?.photoURL ? (
                        <img
                          className="header__account-popup__avatar"
                          src={userProfile.photoURL}
                          alt="Profile"
                        />
                      ) : (
                        <div className="header__account-popup__avatar header__account-popup__avatar--placeholder">
                          {userProfile?.displayName?.charAt(0) || currentUser.email.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="header__account-popup__user-details">
                        <div className="header__account-popup__user-name">
                          {userProfile?.displayName || currentUser.email}
                        </div>
                        <div className="header__account-popup__user-email">
                          {currentUser.email}
                        </div>
                      </div>
                    </div>
                    <div className="header__account-popup__actions">
                      <Link 
                        to="/profile" 
                        className="header__account-popup__link"
                        onClick={() => setIsAccountPopupOpen(false)}
                      >
                        {t('nav.profile', 'Профиль')}
                      </Link>
                      <Link 
                        to="/add-product" 
                        className="header__account-popup__link"
                        onClick={() => setIsAccountPopupOpen(false)}
                      >
                        {t('nav.createAd', 'Создать объявление')}
                      </Link>
                      <Link 
                        to="/favorites" 
                        className="header__account-popup__link"
                        onClick={() => setIsAccountPopupOpen(false)}
                      >
                        {t('nav.favorites', 'Избранное')}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsAccountPopupOpen(false)
                        }}
                        className="header__account-popup__logout"
                      >
                        {t('auth.logout', 'Выйти')}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Login Popup
                  <div className="header__account-popup__auth">
                    <div className="header__account-popup__auth-title">
                      {t('auth.welcomeBack', 'Добро пожаловать!')}
                    </div>
                    <div className="header__account-popup__auth-subtitle">
                      {t('auth.signInToAccount', 'Войдите в свой аккаунт')}
                    </div>
                    <div className="header__account-popup__auth-buttons">
                      <Link 
                        to="/signin" 
                        className="header__account-popup__auth-btn header__account-popup__auth-btn--signin"
                        onClick={() => setIsAccountPopupOpen(false)}
                      >
                        {t('auth.signIn', 'Войти')}
                      </Link>
                      <Link 
                        to="/signup" 
                        className="header__account-popup__auth-btn header__account-popup__auth-btn--signup"
                        onClick={() => setIsAccountPopupOpen(false)}
                      >
                        {t('auth.signUp', 'Регистрация')}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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
          {/* Mobile User Section */}
          {currentUser && (
            <div className="header__mobile-user">
              <div className="header__mobile-user-info">
                {userProfile?.photoURL ? (
                  <img
                    className="header__mobile-user-avatar"
                    src={userProfile.photoURL}
                    alt="Profile"
                  />
                ) : (
                  <div className="header__mobile-user-avatar header__mobile-user-avatar--placeholder">
                    {userProfile?.displayName?.charAt(0) || currentUser.email.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="header__mobile-user-name">
                  {userProfile?.displayName || currentUser.email}
                </span>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          <nav className="header__nav header__nav--mobile">
            <ul className="header__nav-list header__nav-list--mobile">
              {currentUser ? (
                <>
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
                </>
              ) : (
                <>
                  <li className="header__nav-item header__nav-item--mobile">
                    <Link to="/signin" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                      {t('auth.signIn')}
                    </Link>
                  </li>
                  <li className="header__nav-item header__nav-item--mobile">
                    <Link to="/signup" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                      {t('auth.signUp')}
                    </Link>
                  </li>
                </>
              )}
              <li className="header__nav-item header__nav-item--mobile">
                <Link to="/contacts" className="header__nav-link header__nav-link--mobile" onClick={closeMobileMenu}>
                  {t('nav.contacts')}
                </Link>
              </li>
              {currentUser && (
                <li className="header__nav-item header__nav-item--mobile">
                  <button onClick={handleLogout} className="header__nav-link header__nav-link--mobile header__nav-link--logout">
                    {t('auth.logout', 'Выйти')}
                  </button>
                </li>
              )}
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
            <div className="header__mobile-theme-toggle__inner">
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
