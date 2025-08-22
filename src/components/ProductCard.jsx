import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Heart } from "lucide-react"
import { RatingStars } from "./RatingStars"

export const ProductCard = ({ product, onAddToCart, onToggleFavorite, onChatClick }) => {
  const { t } = useTranslation()

  if (!product || !product.name || !product.id) {
    return null
  }

  return (
    <div className="product-card">
      {/* TOP Label */}
      {product.isHot === true && (
        <div className="product-card__top-label">
          ТОП
        </div>
      )}

      {/* Header Section */}
      <div className="product-card__header">
        <div className="product-card__brand">
          <div className="product-card__avatar">
            <img 
              src={product.avatar || "/images/ava-default.png"} 
              alt={product.name}
              className="product-card__avatar-img"
            />
          </div>
          <span>{product.brand || "HOLYTRAFF"}</span>
        </div>

        <div className="product-card__actions">
          <div className="product-card__rating">
            <RatingStars rating={product.rating || 0} />
          </div>

          <button 
            className="product-card__chat-btn"
            onClick={() => onChatClick(product)}
          >
            <img 
              src="/images/comment-icon.svg" 
              alt="chat" 
              className="product-card__chat-icon" 
            />
            <span className="product-card__chat-count">{product.chatCount || "1"}</span>
          </button>

          <button 
            className="product-card__favorite-btn"
            onClick={() => onToggleFavorite(product.id)}
          >
            <Heart 
              className={`product-card__favorite-icon ${product.isFavorite ? 'product-card__favorite-icon--active' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="product-card__content">
        <Link to={`/product/${product.id}`} className="product-card__image-link">
          <div className="product-card__image-container">
            <img
              src={product.image || "/images/golden-mine.jpg"}
              alt={product.name}
              className="product-card__image"
              onError={(e) => {
                e.target.src = "/images/golden-mine.jpg"
              }}
            />
          </div>
        </Link>

        {/* Payment Methods */}
        {product.paymentMethods && product.paymentMethods.length > 0 && (
          <div className="product-card__payment-methods">
            {product.paymentMethods.map((method, index) => (
              <img
                key={index}
                src={`/images/${method.toLowerCase()}.svg`}
                alt={method}
                className="product-card__payment-icon"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="product-card__footer">
        <div className="product-card__type">
          <h3 className="product-card__type-title">
            {product.name || "Назва продукту"}
          </h3>
          <p className="product-card__type-subtitle">
            {t(`categories.${product.category}`) || product.category || "Категорія"}
            {product.subcategory && (
              <span> • {t(`categories.${product.subcategory}`) || product.subcategory}</span>
            )}
          </p>
        </div>

        <div className="product-card__platforms">
          {Array.isArray(product.platforms) && product.platforms.length > 0 
            ? product.platforms.join(", ") 
            : "FB, ASO, TikTok, UAC та інші"
          }
        </div>

        <div className="product-card__pricing">
          {product.oldPrice && product.oldPrice !== product.price && (
            <span className="product-card__old-price">
              {product.oldPrice} {product.currency}
            </span>
          )}
          <span className={`product-card__current-price ${product.isHot ? 'product-card__current-price--hot' : ''}`}>
            {product.price} {product.currency}
          </span>
          {product.negotiablePrice && (
            <div className="product-card__negotiable-note">
              Ціна договірна
            </div>
          )}
        </div>

        <button 
          className="product-card__buy-btn"
          onClick={() => onAddToCart(product)}
        >
          {t('product.buyButton') || "ПРИДБАТИ"}
        </button>
      </div>
    </div>
  )
}
