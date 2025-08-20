import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ProductCard } from "@/components/ProductCard"
import { useCart } from "@/contexts/CartContext"
import { useFavorites } from "@/contexts/FavoritesContext"
import { useProducts } from "@/contexts/ProductsContext"
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"
import { ArrowLeft, Heart } from "lucide-react"

export default function Favorites() {
  const { t } = useTranslation()
  const [favoriteProducts, setFavoriteProducts] = useState([])
  
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useFavorites()
  const { products } = useProducts()
  const { toast } = useToast()

  // Get favorite products
  useEffect(() => {
    const favoriteProducts = products.filter(product => favorites.includes(product.id))
    setFavoriteProducts(favoriteProducts)
  }, [favorites, products])

  const handleAddToCart = (product) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleToggleFavorite = (product) => {
    const isFavorite = favorites.includes(product.id)
    toggleFavorite(product.id)
    
    if (isFavorite) {
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from favorites.`,
      })
    } else {
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to favorites.`,
      })
    }
  }

  const handleChatClick = (product) => {
    toast({
      title: "Chat initiated",
      description: `Starting chat about ${product.name}. Chat count: ${product.chatCount}`,
    })
  }

  // Add favorite status to products
  const productsWithFavorites = favoriteProducts.map(product => ({
    ...product,
    isFavorite: favorites.includes(product.id)
  }))

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('pages.backToProducts')}
          </Link>
          
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold">{t('pages.favorites')}</h1>
            <span className="text-lg text-muted-foreground">
              ({favorites.length})
            </span>
          </div>
        </div>

        {/* Favorites Grid */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start adding products to your favorites to see them here.
            </p>
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-brand-green text-black font-semibold rounded-lg hover:bg-brand-green/90 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
