import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ProductCard } from "./ProductCard"
import { SearchBar } from "./SearchBar"
import { FilterBar } from "./FilterBar"
import { useProducts } from "@/contexts/ProductsContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useCart } from "@/contexts/CartContext"
import { ChevronRight, ArrowLeft, Search, Grid3X3 } from "lucide-react"

export const ProductsSection = () => {
  const { t } = useTranslation()
  const { products, searchProducts } = useProducts()
  const { favorites, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState(new Set())

 
  const categories = [
    {
      id: "applications",
      name: "ЗАСТОСУНКИ",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "igaming-creatives",
      name: "КРЕАТИВИ ДЛЯ IGAMING",
      icon: <ChevronRight className="w-4 h-4" />,
      isActive: true,
      subcategories: [
        { id: "static-creatives", name: "СТАТИЧНІ КРЕАТИВИ" },
        { id: "video-creatives", name: "ВІДЕО-КРЕАТИВИ" }
      ]
    },
    {
      id: "white-landings",
      name: "WHITE LANDINGS",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "direct-landings",
      name: "ПРЯМІ LANDING PAGES",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "vacancies",
      name: "ВАКАНСІЇ",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "merch",
      name: "МЕРЧ",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "builders",
      name: "БІЛДЕРИ",
      icon: <ChevronRight className="w-4 h-4" />,
      isActive: true,
      subcategories: [
        { id: "hostess", name: "ХОСТЕС" },
        { id: "merch-dev", name: "РОЗРОБКА МЕРЧА" },
        { id: "stand-dev", name: "РОЗРОБКА СТЕНДІВ" },
        { id: "stand-dev-2", name: "РОЗРОБКА СТЕНДІВ" }
      ]
    },
    {
      id: "stand",
      name: "СТЕНД",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "accounts",
      name: "АККАУНТИ",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "articles",
      name: "СТАТТІ",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    },
    {
      id: "3d",
      name: "3D",
      icon: <ChevronRight className="w-4 h-4" />,
      subcategories: []
    }
  ]

 
  useEffect(() => {
    const filtered = searchProducts(searchTerm, selectedCategory)
    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, products, searchProducts])


  const productsWithFavorites = filteredProducts.map(product => ({
    ...product,
    isFavorite: favorites.includes(product.id)
  }))

 
  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleToggleFavorite = (product) => {
    toggleFavorite(product.id)
  }

  const handleChatClick = (product) => {
    console.log("Chat clicked for product:", product.name)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
  }

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="products-layout">
      {/* Верхняя навигация с категориями */}
      <nav className="products-header">
        <div className="products-header__container">
          <div className="products-header__left">
            <button 
              className="products-header__categories-btn"
              onClick={toggleSidebar}
            >
              <Grid3X3 className="w-5 h-5" />
              <span>КАТЕГОРІЇ</span>
            </button>
          </div>

          <nav className="products-header__nav">
            <a href="#" className="products-header__nav-link products-header__nav-link--active">
              УСІ ОГОЛОШЕННЯ
            </a>
            <a href="#" className="products-header__nav-link">
              МОЇ ОГОЛОШЕННЯ
            </a>
            <a href="#" className="products-header__nav-link">
              ВІДГУКИ НА ВАШ ПРОДУКТ
            </a>
            <a href="#" className="products-header__nav-link">
              ПРИДБАНІ ПРОДУКТИ
            </a>
            <a href="#" className="products-header__nav-link">
              ОПЛАТА/ПІДПИСКА
            </a>
            <a href="#" className="products-header__nav-link">
              ЧАТИ
            </a>
          </nav>

          <div className="products-header__right">
            <button className="products-header__search-btn">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Боковая панель с категориями (появляется при клике) */}
      {isSidebarOpen && (
        <aside className="products-sidebar">
          <div className="products-sidebar__header">
            <button className="products-sidebar__back-btn" onClick={toggleSidebar}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="products-sidebar__title">КАТЕГОРІЇ</h2>
          </div>
          
          <nav className="products-sidebar__nav">
            {categories.map((category) => (
              <div key={category.id} className="products-sidebar__category">
                <button
                  className={`products-sidebar__category-btn ${category.isActive ? 'products-sidebar__category-btn--active' : ''}`}
                  onClick={() => toggleCategory(category.id)}
                >
                  <span className="products-sidebar__category-name">{category.name}</span>
                  {category.subcategories.length > 0 && (
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${expandedCategories.has(category.id) ? 'rotate-90' : ''}`} 
                    />
                  )}
                </button>
                
                {category.subcategories.length > 0 && expandedCategories.has(category.id) && (
                  <div className="products-sidebar__subcategories">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        className="products-sidebar__subcategory-btn"
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* Основная секция с продуктами */}
      <section className="products-section">
        <div className="products-section__container">
        
          {filteredProducts.length > 0 ? (
            <div className="products-section__grid">
              {productsWithFavorites.map(product => (
                <ProductCard 
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onChatClick={handleChatClick}
                />
              ))}
            </div>
          ) : (
            <div className="products-section__empty">
              <div className="products-section__empty-icon">
                <svg className="products-section__empty-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="products-section__empty-title">No products found</h3>
              <p className="products-section__empty-description">
                Try adjusting your search criteria or browse all products
              </p>
              <button 
                onClick={handleResetFilters}
                className="products-section__reset-btn"
              >
                <svg className="products-section__reset-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Show All Products
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
