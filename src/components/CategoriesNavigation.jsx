import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ChevronRight, X } from "lucide-react"

export const CategoriesNavigation = () => {
  const { t } = useTranslation()
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("igaming-creatives")
  const [activeNavItem, setActiveNavItem] = useState("all")
  const [expandedCategories, setExpandedCategories] = useState({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleAside = () => {
    if (isAsideOpen) {
      setExpandedCategories({})
    }
    setIsAsideOpen(!isAsideOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId)

    setExpandedCategories({})
  }

  const toggleCategoryExpansion = (categoryId) => {
    setExpandedCategories(prev => {

      if (prev[categoryId]) {
        const newState = { ...prev }
        delete newState[categoryId]
        return newState
      }

      return { [categoryId]: true }
    })

    setSelectedCategory(categoryId)
  }

  const navigationItems = [
    { id: "all", label: t('navigation.allAds', 'УСІ ОГОЛОШЕННЯ') },
    { id: "my-ads", label: t('navigation.myAds', 'МОЇ ОГОЛОШЕННЯ') },
    { id: "reviews", label: t('navigation.reviews', 'ВІДГУКИ НА ВАШ ПРОДУКТ') },
    { id: "purchased", label: t('navigation.purchased', 'ПРИДБАНІ ПРОДУКТИ') },
    { id: "payment", label: t('navigation.payment', 'ОПЛАТА/ПІДПІСКА') },
    { id: "chats", label: t('navigation.chats', 'ЧАТИ') }
  ]

  const categoriesData = [
    {
      id: "applications",
      label: t('categories.applications', 'ЗАСТОСУНКИ'),
      hasSubcategories: true,
      subcategories: [
        { id: "test1", label: t('categories.test1', 'Тест1') },
        { id: "test2", label: t('categories.test2', 'Тест2') }
      ]
    },
    {
      id: "igaming-creatives",
      label: t('categories.igamingCreatives', 'КРЕАТИВИ ДЛЯ IGAMING'),
      hasSubcategories: true,
      subcategories: [
        { id: "static-creatives", label: t('categories.staticCreatives', 'Статичні креативи') },
        { id: "video-creatives", label: t('categories.videoCreatives', 'Відео-креативи') }
      ]
    },
    {
      id: "white-landings",
      label: t('categories.whiteLandings', 'White Landings'),
      hasSubcategories: false
    },
    {
      id: "direct-landings",
      label: t('categories.directLandings', 'Прямі Landing Pages'),
      hasSubcategories: false
    },
    {
      id: "vacancies",
      label: t('categories.vacancies', 'Вакансії'),
      hasSubcategories: false
    },
    {
      id: "merch",
      label: t('categories.merch', 'Мерч'),
      hasSubcategories: false
    },
    {
      id: "builders",
      label: t('categories.builders', 'Білдери'),
      hasSubcategories: true,
      subcategories: [
        { id: "hostess", label: t('categories.hostess', 'Хостес') },
        { id: "merch-development", label: t('categories.merchDevelopment', 'Розробка мерча') },
        { id: "stand-development", label: t('categories.standDevelopment', 'Розробка стендів') }
      ]
    },
    {
      id: "stand",
      label: t('categories.stand', 'Стенд'),
      hasSubcategories: false
    },
    {
      id: "accounts",
      label: t('categories.accounts', 'Аккаунти'),
      hasSubcategories: false
    },
    {
      id: "articles",
      label: t('categories.articles', 'Статті'),
      hasSubcategories: false
    },
    {
      id: "3d",
      label: t('categories.3d', '3D'),
      hasSubcategories: false
    }
  ]

  return (
    <nav className="categories-navigation">

      <div className="categories-navigation__header">
        <div className="page-width">
          <div className="categories-navigation__header-content">
            <div className="categories-navigation__left">

              <button
                className="categories-navigation__categories-btn"
                onClick={toggleAside}
              >
                <img
                  src="/images/category-icon.svg"
                  alt="categories"
                  className="categories-navigation__categories-icon"
                />
                <span>{t('navigation.categories', 'КАТЕГОРІЇ')}</span>
              </button>
              <button
                className={`categories-navigation__mobile-menu-btn ${isMobileMenuOpen ? 'mobile-open' : ''}`}
                onClick={toggleMobileMenu}
              >
                <img
                  src="/images/drop-down-icon.svg"
                  alt="menu"
                  className="categories-navigation__mobile-menu-icon"
                />
              </button>
            </div>
            <nav className={`categories-navigation__nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`categories-navigation__nav-link ${activeNavItem === item.id ? 'active' : ''}`}
                  onClick={() => setActiveNavItem(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className={`categories-navigation__right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <button className="categories-navigation__search-btn">
                <img
                  src="/images/search-icon.svg"
                  alt="search"
                  className="categories-navigation__search-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside className={`categories-navigation__aside ${isAsideOpen ? 'open' : ''}`}>
        <div className="categories-navigation__aside-header">
          <button
            className="categories-navigation__aside-close-btn"
            onClick={toggleAside}
          >
            <img
              src="/images/arrow-back-icon.svg"
              alt="close"
              className="categories-navigation__aside-close-icon"
            />
          </button>
          <h3 className="categories-navigation__aside-title">
            {t('navigation.categories', 'КАТЕГОРІЇ')}
          </h3>

        </div>

        <nav className="categories-navigation__aside-nav">
          {categoriesData.map((category) => (
            <div key={category.id} className="categories-navigation__aside-category">
              <button
                className={`categories-navigation__aside-category-btn ${selectedCategory === category.id ? 'active' : ''} ${expandedCategories[category.id] ? 'expanded' : ''}`}
                onClick={() => {
                  if (category.hasSubcategories) {
                    toggleCategoryExpansion(category.id)
                  } else {
                    selectCategory(category.id)
                  }
                }}
              >
                <span className="categories-navigation__aside-category-label">
                  {category.label}
                </span>
                {category.hasSubcategories && (
                  <ChevronRight
                    className={`categories-navigation__aside-expand-icon ${expandedCategories[category.id] ? 'expanded' : ''}`}
                  />
                )}
              </button>

              {expandedCategories[category.id] && category.hasSubcategories && (
                <div className="categories-navigation__aside-subcategories-panel">
                  <div className="categories-navigation__aside-subcategories">
                    {category.subcategories?.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        className={`categories-navigation__aside-subcategory-btn ${selectedCategory === subcategory.id ? 'active' : ''}`}
                        onClick={() => selectCategory(subcategory.id)}
                      >
                        {subcategory.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {isAsideOpen && (
        <div
          className="categories-navigation__aside-overlay"
          onClick={toggleAside}
        />
      )}
    </nav>
  )
}
