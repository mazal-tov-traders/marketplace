import { useTranslation } from "react-i18next"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { Rating } from "@/components/Rating"
import { Link } from "react-router-dom"

export const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useTranslation()

  const displayPrice = product.hotPrice || product.price

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title hover:text-brand-green transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="product-description">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="space-y-2">
          {/* Old Price (if exists) */}
          {product.oldPrice && (
            <div className="price-old">
              ${product.oldPrice}
            </div>
          )}
          
          {/* Current Price */}
          <div className="flex items-center gap-2">
            {product.hotPrice ? (
              <>
                <span className="price-discount">
                  ${product.price}
                </span>
                <span className="price-hot">
                  ${product.hotPrice}
                </span>
              </>
            ) : (
              <span className="price-discount">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Rating rating={product.rating} />
          <span className="text-sm text-muted-foreground">
            ({product.reviews.length} {t('product.reviews')})
          </span>
        </div>

        {/* Add to Cart Button */}
        <MarketplaceButton 
          onClick={() => onAddToCart(product)}
          className="w-full"
          variant="green"
        >
          {t('product.addToCart')}
        </MarketplaceButton>
      </div>
    </div>
  )
}
