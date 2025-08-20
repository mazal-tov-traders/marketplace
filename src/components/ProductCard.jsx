import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Rating } from "@/components/Rating"

export const ProductCard = ({ product, onAddToCart, onToggleFavorite, onChatClick }) => {
  const { t } = useTranslation()


  if (!product || !product.name || !product.id) {
    return null
  }

  const displayPrice = product.hotPrice || product.price || "0"
  const isDiscounted = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(displayPrice)

  return (
    <div className="product-card">
      {/* TOP Label */}
      {product.isHot === true && (
        <div className="product-card__top-label">
          ТОП
        </div>
      )}
      
      
      <div className="product-card__header">
        <div className="product-card__brand">
          {product.brand || "HOLYTRAFF"}
        </div>
        
        <div className="product-card__actions">
          {/* Rating */}
          <div className="product-card__rating">
            <Rating rating={product.rating || 0} />
          </div>
          
          {/* Chat Button */}
          <button 
            className="product-card__chat-btn"
            onClick={() => onChatClick && onChatClick(product)}
            aria-label="Chat about this product"
          >
            <div className="product-card__chat-icon">
              <span className="product-card__chat-count">
                {product.chatCount || 1}
              </span>
            </div>
          </button>
          
          {/* Favorite Button */}
          <button 
            className="product-card__favorite-btn"
            onClick={() => onToggleFavorite && onToggleFavorite(product)}
            aria-label="Add to favorites"
          >
            <div className={`product-card__favorite-icon ${product.isFavorite === true ? 'product-card__favorite-icon--active' : ''}`}>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2.5L11.5 4.5C11.8 4.8 12.2 5 12.6 5.1L15 5.6L13.5 7.1C13.2 7.4 13.1 7.8 13.2 8.2L13.6 10.6L11.3 9.3C10.9 9.1 10.5 9.1 10.1 9.3L7.8 10.6L8.2 8.2C8.3 7.8 8.2 7.4 7.9 7.1L6.4 5.6L8.8 5.1C9.2 5 9.6 4.8 9.9 4.5L10 2.5Z" 
                      fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="product-card__content">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="product-card__image-link">
          <div className="product-card__image-container">
            <img 
              src={product.image || "/images/placeholder.svg"} 
              alt={product.name}
              className="product-card__image"
              onError={(e) => {
                console.log("Image failed to load:", product.image)
                e.target.src = "/images/placeholder.svg"
              }}
              onLoad={(e) => {
                console.log("Image loaded successfully:", product.image)
              }}
            />
            {/* Overlay Text */}
            {product.overlayText && (
              <div className="product-card__overlay-text">
                {product.overlayText}
              </div>
            )}
          </div>
        </Link>

        {/* Promotional Text */}
        {product.promotionalText && (
          <div className="product-card__promo-text">
            {product.promotionalText}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="product-card__footer">
        {/* Product Type */}
        <div className="product-card__type">
          <h3 className="product-card__type-title">
            {t(`product.types.${product.type || 'static'}`)}
          </h3>
          <p className="product-card__type-subtitle">
            {t(`product.subtypes.${product.subtype || 'single'}`)}
          </p>
        </div>

        {/* Platforms */}
        {product.platforms && product.platforms.length > 0 && (
          <div className="product-card__platforms">
            {product.platforms.join(", ")}
          </div>
        )}

        {/* Pricing */}
        <div className="product-card__pricing">
          {isDiscounted && (
            <span className="product-card__old-price">
              {product.oldPrice}
            </span>
          )}
          <span className={`product-card__current-price ${product.isHot === true ? 'product-card__current-price--hot' : ''}`}>
            {displayPrice}
          </span>
        </div>

        {/* Buy Button */}
        <button 
          className="product-card__buy-btn"
          onClick={() => onAddToCart && onAddToCart(product)}
        >
          {t('product.buyButton')}
        </button>
      </div>
    </div>
  )
}
