import React, { createContext, useContext, useEffect, useState } from "react"
import productsData from "@/data/products.json"

const ProductsContext = createContext(undefined)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('marketplace-products')
    return savedProducts ? JSON.parse(savedProducts) : productsData
  })

  useEffect(() => {
    localStorage.setItem('marketplace-products', JSON.stringify(products))
  }, [products])

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(), // Простой способ генерации уникального ID
      rating: 0,
      reviews: [],
      isFavorite: false,
      isHot: false,
      // Убеждаемся, что platforms и tags являются массивами
      platforms: Array.isArray(newProduct.platforms) ? newProduct.platforms : [],
      tags: Array.isArray(newProduct.tags) ? newProduct.tags : []
    }
    
    setProducts(currentProducts => [productWithId, ...currentProducts])
    return productWithId
  }

  const updateProduct = (id, updates) => {
    setProducts(currentProducts =>
      currentProducts.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    )
  }

  const deleteProduct = (id) => {
    setProducts(currentProducts =>
      currentProducts.filter(product => product.id !== id)
    )
  }

  const getProductById = (id) => {
    // Поддерживаем как строковые, так и числовые ID
    const stringId = String(id)
    const numericId = parseInt(id)
    
    return products.find(product => 
      String(product.id) === stringId || product.id === numericId
    )
  }

  const searchProducts = (searchTerm, category = "all") => {
    let filtered = products

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter(product => product.category === category)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }

    return filtered
  }

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      searchProducts
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
