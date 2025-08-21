import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "@/contexts/CartContext"
import { useProducts } from "@/contexts/ProductsContext"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { Rating } from "@/components/Rating"
import { ArrowLeft, Star, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Product() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const { getProductById } = useProducts()
  const { toast } = useToast()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    // Ищем продукт по ID (может быть строкой или числом)
    const foundProduct = getProductById(parseInt(id) || id)
    setProduct(foundProduct)
  }, [id, getProductById])

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="product-not-found__content">
          <h1 className="product-not-found__title">Product not found</h1>
          <Link to="/">
            <MarketplaceButton variant="green">
              Go Home
            </MarketplaceButton>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const images = [product.image] // In a real app, you'd have multiple images

  return (
    <div className="product-page">
      <div className="page-width">
        <div className="product-page__inner">
          {/* Back Button */}
          <Link 
            to="/" 
            className="product-page__back-btn"
          >
            <ArrowLeft className="product-page__back-icon" />
            Back to Products
          </Link>

          <div className="product-page__grid">
            {/* Product Images */}
            <div className="product-page__images">
              {/* Main Image */}
              <div className="product-page__main-image">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="product-page__image"
                />
              </div>
              
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="product-page__thumbnails">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`product-page__thumbnail ${selectedImage === index ? 'product-page__thumbnail--active' : ''}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="product-page__thumbnail-image"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-page__info">
              <div className="product-page__header">
                <h1 className="product-page__title">{product.name}</h1>
                <p className="product-page__description">{product.description}</p>
              </div>

              {/* Rating */}
              <div className="product-page__rating">
                <Rating rating={product.rating} />
                <span className="product-page__rating-count">
                  ({product.reviews.length} {t('product.reviews')})
                </span>
              </div>

              {/* Price */}
              <div className="product-page__pricing">
                {product.oldPrice && (
                  <div className="product-page__old-price">
                    ${product.oldPrice}
                  </div>
                )}
                <div className="product-page__current-price">
                  ${product.hotPrice || product.price}
                </div>
              </div>

              {/* Category & Tags */}
              <div className="product-page__details">
                <div className="product-page__category">
                  <span className="product-page__label">Category: </span>
                  <span className="product-page__value">{product.category}</span>
                </div>
                {product.tags && product.tags.length > 0 && (
                  <div className="product-page__tags">
                    <span className="product-page__label">Tags: </span>
                    <div className="product-page__tags-list">
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="product-page__tag"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="product-page__actions">
                <MarketplaceButton
                  onClick={handleAddToCart}
                  className="product-page__add-to-cart-btn"
                  variant="green"
                  size="lg"
                >
                  <ShoppingCart className="product-page__cart-icon" />
                  Add to Cart
                </MarketplaceButton>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="product-page__reviews">
              <h2 className="product-page__reviews-title">Reviews</h2>
              <div className="product-page__reviews-list">
                {product.reviews.map((review) => (
                  <div key={review.id} className="product-page__review">
                    <div className="product-page__review-header">
                      <span className="product-page__review-author">{review.user}</span>
                      <div className="product-page__review-stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`product-page__star ${index < review.rating ? 'product-page__star--filled' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="product-page__review-comment">{review.comment}</p>
                    <span className="product-page__review-date">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
