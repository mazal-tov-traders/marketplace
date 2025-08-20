import React, { createContext, useContext, useEffect, useState } from "react"

const FavoritesContext = createContext(undefined)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('marketplace-favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  useEffect(() => {
    localStorage.setItem('marketplace-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (productId) => {
    setFavorites(currentFavorites => {
      if (!currentFavorites.includes(productId)) {
        return [...currentFavorites, productId]
      }
      return currentFavorites
    })
  }

  const removeFromFavorites = (productId) => {
    setFavorites(currentFavorites => 
      currentFavorites.filter(id => id !== productId)
    )
  }

  const toggleFavorite = (productId) => {
    setFavorites(currentFavorites => {
      if (currentFavorites.includes(productId)) {
        return currentFavorites.filter(id => id !== productId)
      } else {
        return [...currentFavorites, productId]
      }
    })
  }

  const isFavorite = (productId) => {
    return favorites.includes(productId)
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      getFavoritesCount,
      clearFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
