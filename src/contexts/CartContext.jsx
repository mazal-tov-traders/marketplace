import React, { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const savedCart = localStorage.getItem('marketplace-cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('marketplace-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.product.id === product.id)
      
      if (existingItem) {
        return currentItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...currentItems, { product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setItems(currentItems => currentItems.filter(item => item.product.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.product.hotPrice || item.product.price
      return total + (price * item.quantity)
    }, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
