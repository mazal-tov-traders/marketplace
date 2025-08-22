import React, { createContext, useContext, useEffect, useState } from "react"
import productsData from "@/data/products.json"
import { addProduct as addProductService, updateProduct as updateProductService, deleteProduct as deleteProductService } from "@/lib/productService"

export const ProductsContext = createContext(undefined)

// Функция для нормализации продукта
const normalizeProduct = (product) => {
  return {
    ...product,
    platforms: Array.isArray(product.platforms) ? product.platforms : [],
    tags: Array.isArray(product.tags) ? product.tags : [],
    rating: product.rating || 0,
    reviews: Array.isArray(product.reviews) ? product.reviews : [],
    isFavorite: Boolean(product.isFavorite),
    isHot: Boolean(product.isHot),
    chatCount: product.chatCount || "1",
    brand: product.brand || "HOLYTRAFF",
    avatar: product.avatar || "/images/ava-default.png"
  }
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('marketplace-products')
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts)
        return parsedProducts.map(normalizeProduct)
      }
      return productsData.map(normalizeProduct)
    } catch (error) {
      console.error("Error loading products from localStorage:", error)
      return productsData.map(normalizeProduct)
    }
  })

  useEffect(() => {
    localStorage.setItem('marketplace-products', JSON.stringify(products))
  }, [products])

  // Очистка blob URL'ов при размонтировании
  useEffect(() => {
    return () => {
      // Очищаем все blob URL'ы при размонтировании
      products.forEach(product => {
        if (product.image && product.image.startsWith('blob:')) {
          URL.revokeObjectURL(product.image)
        }
        if (product.images && Array.isArray(product.images)) {
          product.images.forEach(img => {
            if (img && img.startsWith('blob:')) {
              URL.revokeObjectURL(img)
            }
          })
        }
      })
    }
  }, [products])

  const addProduct = async (newProduct, files = []) => {
    try {
      // Используем сервис для добавления продукта
      const result = await addProductService(newProduct, files)
      
      if (result.success) {
        // Обновляем локальное состояние
        setProducts(currentProducts => [result.product, ...currentProducts])
        return result.product
      } else {
        throw new Error(result.message || 'Помилка додавання продукту')
      }
    } catch (error) {
      console.error("Error adding product:", error)
      // Возвращаем ошибку вместо throw, чтобы AddProduct мог её обработать
      throw new Error(error.message || 'Помилка додавання продукту')
    }
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
