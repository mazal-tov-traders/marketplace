import { useTranslation } from "react-i18next"
import { useCart } from "@/contexts/CartContext"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { Trash2, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"

export default function Cart() {
  const { t } = useTranslation()
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="marketplace-container text-center">
          <h1 className="text-3xl font-bold mb-4">{t('cart.empty')}</h1>
          <p className="text-muted-foreground mb-8">{t('cart.emptyDescription')}</p>
          <Link to="/">
            <MarketplaceButton variant="green">
              {t('cart.continueShopping')}
            </MarketplaceButton>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container">
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-card rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.product.description}
                    </p>
                    <p className="text-lg font-bold text-brand-green">
                      ${item.product.hotPrice || item.product.price}
                    </p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>{t('cart.subtotal')}</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.free')}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>{t('cart.total')}</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <MarketplaceButton className="w-full" variant="green">
                  {t('cart.checkout')}
                </MarketplaceButton>
                
                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('cart.clearCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
