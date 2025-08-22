// Сервис для работы с продуктами
import productsData from '../data/products.json'

// Базовый URL API
const API_BASE_URL = 'http://localhost:3001/api'

// Функция для конвертации файла в base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Получить все продукты
export const getAllProducts = () => {
  return productsData
}

// Получить продукт по ID
export const getProductById = (id) => {
  return productsData.find(product => product.id === id)
}

// Получить продукты по категории
export const getProductsByCategory = (category) => {
  return productsData.filter(product => product.category === category)
}

// Добавить новый продукт
export const addProduct = async (productData, files) => {
  try {
    // Конвертируем файлы в base64 для хранения
    const processFiles = async () => {
             if (files.length === 0) {
         return {
           image: "/images/golden-mine.jpg", // Используем существующий файл как fallback
           images: []
         }
       }

      const processedImages = []
      for (const file of files) {
        try {
          const base64 = await convertFileToBase64(file)
          processedImages.push(base64)
                 } catch (error) {
           console.error('Error processing file:', error)
           processedImages.push("/images/golden-mine.jpg")
         }
      }

      return {
        image: processedImages[0] || "/images/placeholder.svg",
        images: processedImages
      }
    }

    const { image, images } = await processFiles()

         // Сначала пробуем API, если недоступен - сохраняем локально
     let apiSuccess = false
     
     try {
       // Отправляем запрос на API сервер
       const response = await fetch(`${API_BASE_URL}/products`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           productData,
           files: [image, ...images.slice(1)] // Первое изображение как основное
         })
       })

       if (response.ok) {
         const result = await response.json()
         
         if (result.success) {
           // Также сохраняем в localStorage для совместимости
           const existingProducts = JSON.parse(localStorage.getItem('marketplace-products') || '[]')
           const updatedProducts = [...existingProducts, result.product]
           localStorage.setItem('marketplace-products', JSON.stringify(updatedProducts))

           return {
             success: true,
             product: result.product,
             message: 'Продукт успішно додано!'
           }
         }
       }
     } catch (apiError) {
       console.log('API недоступен, сохраняем локально:', apiError.message)
     }

     // Если API недоступен или не сработал, сохраняем локально
     const newProduct = {
       id: Date.now(),
       name: productData.name,
       description: productData.description,
       price: productData.price,
       currency: productData.currency,
       negotiablePrice: productData.negotiablePrice,
       oldPrice: productData.price,
       hotPrice: productData.price,
       category: productData.category,
       subcategory: productData.subcategory || null,
       tags: [productData.category, productData.subcategory].filter(Boolean),
       image: image,
       images: images,
       avatar: "/images/ava-default.png",
       rating: 0,
       reviews: [],
       brand: "HOLYTRAFF",
       type: productData.category,
       subtype: productData.subcategory || "single",
       platforms: ["FB", "ASO", "TikTok", "UAC"],
       promotionalText: "",
       overlayText: "",
       chatCount: "0",
       isFavorite: false,
       isHot: false,
       autoRenewal: productData.autoRenewal,
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString()
     }

     const existingProducts = JSON.parse(localStorage.getItem('marketplace-products') || '[]')
     const updatedProducts = [...existingProducts, newProduct]
     localStorage.setItem('marketplace-products', JSON.stringify(updatedProducts))

     return {
       success: true,
       product: newProduct,
       message: 'Продукт додано локально'
     }
  } catch (error) {
    console.error('Error adding product:', error)
    return {
      success: false,
      error: error.message,
      message: 'Помилка додавання продукту'
    }
  }
}

// Обновить продукт
export const updateProduct = async (id, updates) => {
  try {
    const productIndex = productsData.findIndex(product => product.id === id)
    if (productIndex === -1) {
      throw new Error('Продукт не знайдено')
    }

    const updatedProduct = {
      ...productsData[productIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    productsData[productIndex] = updatedProduct

    // Обновляем в localStorage
    const existingProducts = JSON.parse(localStorage.getItem('marketplace-products') || '[]')
    const updatedProducts = existingProducts.map(product => 
      product.id === id ? updatedProduct : product
    )
    localStorage.setItem('marketplace-products', JSON.stringify(updatedProducts))

    return {
      success: true,
      product: updatedProduct,
      message: 'Продукт успішно оновлено!'
    }
  } catch (error) {
    console.error('Error updating product:', error)
    return {
      success: false,
      error: error.message,
      message: 'Помилка оновлення продукту'
    }
  }
}

// Удалить продукт
export const deleteProduct = async (id) => {
  try {
    const productIndex = productsData.findIndex(product => product.id === id)
    if (productIndex === -1) {
      throw new Error('Продукт не знайдено')
    }

    const deletedProduct = productsData.splice(productIndex, 1)[0]

    // Удаляем из localStorage
    const existingProducts = JSON.parse(localStorage.getItem('marketplace-products') || '[]')
    const updatedProducts = existingProducts.filter(product => product.id !== id)
    localStorage.setItem('marketplace-products', JSON.stringify(updatedProducts))

    return {
      success: true,
      product: deletedProduct,
      message: 'Продукт успішно видалено!'
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    return {
      success: false,
      error: error.message,
      message: 'Помилка видалення продукту'
    }
  }
}

// Поиск продуктов
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase()
  return productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

// Получить продукты с пагинацией
export const getProductsWithPagination = (page = 1, limit = 12) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const products = productsData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(productsData.length / limit)
  
  return {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts: productsData.length,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  }
}
