import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useCart } from "@/contexts/CartContext"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { Rating } from "@/components/Rating"
import { ArrowLeft, Star, ShoppingCart } from "lucide-react"
import productsData from "@/data/products.json"
import { useToast } from "@/hooks/use-toast"

export default function Product() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id))
    setProduct(foundProduct)
  }, [id])

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Product not found</h1>
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
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? 'border-brand-green' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <Rating rating={product.rating} />
              <span className="text-muted-foreground">
                ({product.reviews.length} {t('product.reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {product.oldPrice && (
                <div className="text-2xl text-muted-foreground line-through">
                  ${product.oldPrice}
                </div>
              )}
              <div className="text-4xl font-bold text-brand-green">
                ${product.hotPrice || product.price}
              </div>
            </div>

            {/* Category & Tags */}
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Category: </span>
                <span className="text-muted-foreground capitalize">{product.category}</span>
              </div>
              {product.tags.length > 0 && (
                <div>
                  <span className="font-semibold">Tags: </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <MarketplaceButton
                onClick={handleAddToCart}
                className="w-full"
                variant="green"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </MarketplaceButton>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-card rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.user}</span>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
