import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ProductCard } from "./ProductCard"
import { useProducts } from "@/contexts/ProductsContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useCart } from "@/contexts/CartContext"

export const ProductsSection = () => {
  const { t } = useTranslation()
  const { products, searchProducts } = useProducts()
  const { favorites, toggleFavorite } = useFavorites()
  const { addToCart } = useCart()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState([])

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
    console.log("Chat clicked for product:", product)
  }

  if (filteredProducts.length === 0) {
    return (
      <section className="products-section">
        <div className="page-width">
          <div className="products-section__empty">
            <h3>{t('products.empty', 'Товари не знайдено')}</h3>
            <p>{t('products.emptyDescription', 'Спробуйте змінити пошуковий запит або категорію')}</p>
            <p>{t('products.createFirst', 'Або створіть перший товар!')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="products-section">
      <div className="page-width">
        <div className="products-section__header">
          <h2 className="products-section__title">
            {t('products.title', 'Всі товари')} ({filteredProducts.length})
          </h2>
          {searchTerm && (
            <p className="products-section__search-info">
              {t('products.searchResults', 'Результати пошуку для')}: "{searchTerm}"
            </p>
          )}
        </div>
        
        <div className="products-section__grid">
          {productsWithFavorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onChatClick={handleChatClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
