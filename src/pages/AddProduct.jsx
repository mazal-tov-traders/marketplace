import { useState, useRef, useContext, useEffect, useMemo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Upload, Paperclip, X } from "lucide-react"
import { Hero } from "../components/Hero"
import { ProductsContext } from "../contexts/ProductsContext"

export default function AddProduct() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { addProduct } = useContext(ProductsContext)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    price: "",
    currency: "USD",
    negotiablePrice: true,
    autoRenewal: false
  })

  const [files, setFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Категории из CategoriesNavigation.jsx - мемоизированы для производительности
  const categoriesData = useMemo(() => [
    {
      id: "applications",
      label: t('categories.applications', 'ЗАСТОСУНКИ'),
      hasSubcategories: true,
      subcategories: [
        { id: "test1", label: t('categories.test1', 'Тест1') },
        { id: "test2", label: t('categories.test2', 'Тест2') }
      ]
    },
    {
      id: "igaming-creatives",
      label: t('categories.igamingCreatives', 'КРЕАТИВИ ДЛЯ IGAMING'),
      hasSubcategories: true,
      subcategories: [
        { id: "static-creatives", label: t('categories.staticCreatives', 'СТАТИЧНІ КРЕАТИВИ') },
        { id: "video-creatives", label: t('categories.videoCreatives', 'ВІДЕО-КРЕАТИВИ') }
      ]
    },
    {
      id: "white-landings",
      label: t('categories.whiteLandings', 'WHITE LANDINGS'),
      hasSubcategories: false
    },
    {
      id: "direct-landings",
      label: t('categories.directLandings', 'ПРЯМІ LANDING PAGES'),
      hasSubcategories: false
    },
    {
      id: "vacancies",
      label: t('categories.vacancies', 'ВАКАНСІЇ'),
      hasSubcategories: false
    },
    {
      id: "merch",
      label: t('categories.merch', 'МЕРЧ'),
      hasSubcategories: false
    },
    {
      id: "builders",
      label: t('categories.builders', 'БІЛДЕРИ'),
      hasSubcategories: true,
      subcategories: [
        { id: "hostess", label: t('categories.hostess', 'Хостес') },
        { id: "merch-development", label: t('categories.merchDevelopment', 'Розробка мерча') },
        { id: "stand-development", label: t('categories.standDevelopment', 'Розробка стендів') }
      ]
    },
    {
      id: "stand",
      label: t('categories.stand', 'СТЕНД'),
      hasSubcategories: false
    },
    {
      id: "accounts",
      label: t('categories.accounts', 'АККАУНТИ'),
      hasSubcategories: false
    },
    {
      id: "articles",
      label: t('categories.articles', 'СТАТТІ'),
      hasSubcategories: false
    },
    {
      id: "3d",
      label: t('categories.3d', '3D'),
      hasSubcategories: false
    }
  ], [t])

  const currencies = useMemo(() => [
    { code: "USD", label: "USD" },
    { code: "EUR", label: "EUR" },
    { code: "UAH", label: "UAH" },
    { code: "USDT", label: "USDT" }
  ], [])

  const toggleCategoriesExpansion = useCallback(() => {
    setIsCategoriesExpanded(prev => !prev)
    if (isCategoriesExpanded) {
      setExpandedCategories({})
    }
  }, [isCategoriesExpanded])

  const toggleCategoryExpansion = useCallback((categoryId) => {
    setExpandedCategories(prev => {
      if (prev[categoryId]) {
        const newState = { ...prev }
        delete newState[categoryId]
        return newState
      }
      return { [categoryId]: true }
    })
  }, [])

    const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Сброс ошибок при изменении
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
    
    // Сброс подкатегории при смене категории только если новая категория не поддерживает текущую подкатегорию
    if (name === 'category') {
      setFormData(prev => {
        const newCategory = value
        const categoryData = categoriesData.find(cat => cat.id === newCategory)
        const shouldResetSubcategory = !categoryData?.subcategories?.some(sub => sub.id === prev.subcategory)
        
        return {
          ...prev,
          subcategory: shouldResetSubcategory ? "" : prev.subcategory
        }
      })
    }
  }, [errors, categoriesData])

    const handleFileUpload = useCallback(async (e) => {
    const uploadedFiles = Array.from(e.target.files)
    const validFiles = uploadedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/')
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB максимум
      return isValidType && isValidSize
    })
    
    if (validFiles.length === 0) return
    
    const newFiles = [...files, ...validFiles].slice(0, 5) // Максимум 5 файлов
    setFiles(newFiles)
    
    // Создаем preview для новых файлов
    const newPreviews = []
    for (const file of validFiles) {
      try {
        const preview = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
        newPreviews.push(preview)
      } catch (error) {
        console.error('Error creating preview:', error)
        newPreviews.push("/images/placeholder.svg")
      }
    }
    
    setFilePreviews(prev => [...prev, ...newPreviews].slice(0, 5))
    
    // Сброс ошибки файлов при успешной загрузке
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: null }))
    }
  }, [files, errors.files])

  const removeFile = useCallback((index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setFilePreviews(prev => prev.filter((_, i) => i !== index))
  }, [])

  const reorderFiles = useCallback((fromIndex, toIndex) => {
    setFiles(prev => {
      const newFiles = [...prev]
      const [removed] = newFiles.splice(fromIndex, 1)
      newFiles.splice(toIndex, 0, removed)
      return newFiles
    })
    
    setFilePreviews(prev => {
      const newPreviews = [...prev]
      const [removed] = newPreviews.splice(fromIndex, 1)
      newPreviews.splice(toIndex, 0, removed)
      return newPreviews
    })
  }, [])

    const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/')
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB максимум
      return isValidType && isValidSize
    })
    
    if (validFiles.length === 0) return
    
    setFiles(prev => [...prev, ...validFiles].slice(0, 5))
    
    if (errors.files) {
      setErrors(prev => ({ ...prev, files: null }))
    }
  }, [errors.files])

    const validateForm = useCallback(() => {
    const newErrors = {}
    
    if (formData.name.length < 16) {
      newErrors.name = t('validation.nameMinLength', 'Введіть щонайменше 16 символів')
    }
    
    if (!formData.category) {
      newErrors.category = t('validation.categoryRequired', 'Оберіть категорію')
    }
    
    if (formData.description.length < 40) {
      newErrors.description = t('validation.descriptionMinLength', 'Введіть щонайменше 40 символів')
    }
    
         if (!formData.price) {
       newErrors.price = t('validation.priceRequired', 'Вкажіть ціну')
     }
    
    if (files.length === 0) {
      newErrors.files = t('validation.filesRequired', 'Додайте хоча б одне фото/відео')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData.name, formData.category, formData.description, formData.price, formData.negotiablePrice, files.length, t])

    const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
         try {
       // Добавляем продукт через контекст
       const newProduct = await addProduct(formData, files)
       
       console.log("Product added successfully:", newProduct)
       alert(t('success.productCreated', 'Оголошення створено успішно!'))
       
       // Перенаправляем на главную страницу
       navigate("/")
     } catch (error) {
       console.error("Error creating product:", error)
       const errorMessage = error.message || 'Невідома помилка'
       alert(t('error.productCreation', 'Помилка створення оголошення: ') + errorMessage)
     } finally {
       setIsSubmitting(false)
     }
  }, [validateForm, addProduct, formData, files, t, navigate])

  const selectedCategory = useMemo(() => 
    categoriesData.find(cat => cat.id === formData.category), 
    [categoriesData, formData.category]
  )
  
  const hasSubcategories = useMemo(() => 
    selectedCategory?.hasSubcategories, 
    [selectedCategory]
  )

    // Отслеживаем размер экрана для мобильной адаптации с debounce
  useEffect(() => {
    let timeoutId
    
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 768
      setIsMobile(prev => {
        if (prev !== newIsMobile) {
          return newIsMobile
        }
        return prev
      })
    }
    
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }
    
    checkMobile()
    window.addEventListener('resize', debouncedCheckMobile)
    
    return () => {
      window.removeEventListener('resize', debouncedCheckMobile)
      clearTimeout(timeoutId)
    }
  }, [])

  // Очистка неиспользуемых состояний при размонтировании
  useEffect(() => {
    return () => {
      setFiles([])
      setFilePreviews([])
      setErrors({})
      setExpandedCategories({})
    }
  }, [])



  return (
    <div className="add-product">
      <Hero />
      <div className="add-product__inner page-width">
        {/* Header */}
        <div className="add-product__header">
          <h1 className="add-product__header-title">
            {t('pages.createAnnouncement', 'СТВОРИТИ ОГОЛОШЕННЯ')}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="add-product__form">
          {/* ОПИШІТЬ У ПОДРОБИЦЯХ */}
          <div className="add-product__section">
            <h2 className="add-product__section-title">
              {t('form.describeInDetail', 'ОПИШІТЬ У ПОДРОБИЦЯХ')}
            </h2>

            <div className="add-product__section-content">
              {/* Назва */}
              <div>
                <label className="add-product__field-label">
                  {t('form.enterName', 'Вкажіть назву*')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="add-product__field-input"
                  placeholder={t('form.namePlaceholder', 'Введіть назву оголошення')}
                />
                {errors.name && (
                  <p className="add-product__field-error">{errors.name}</p>
                )}
              </div>

              {/* Категорія */}
              <div>
                <label className="add-product__field-label">
                  {t('form.category', 'Категорія*')}
                </label>

                <div className="add-product__categories">
                  {/* Кнопка для свертывания/разворачивания всего списка */}
                  <button
                    type="button"
                    className="add-product__categories-toggle-btn"
                    onClick={toggleCategoriesExpansion}
                  >
                    <span className="add-product__categories-toggle-label">
                      {t('form.selectCategory', 'КАТЕГОРІЯ')}
                    </span>
                    <img
                      src="/images/drop-down-icon.svg"
                      alt="Toggle categories"
                      className={`add-product__categories-toggle-icon ${isCategoriesExpanded ? 'expanded' : ''}`}
                    />
                  </button>

                  {/* Список категорий */}
                  {isCategoriesExpanded && (
                    <div className="add-product__categories-list">
                      {categoriesData.map((category) => (
                        <div key={category.id} className="add-product__category">
                          <button
                            type="button"
                            className={`add-product__category-btn ${formData.category === category.id ? 'active' : ''} ${expandedCategories[category.id] ? 'expanded' : ''}`}
                            onClick={() => {
                              if (category.hasSubcategories) {
                                toggleCategoryExpansion(category.id)
                              } else {
                                setFormData(prev => ({ ...prev, category: category.id, subcategory: "" }))
                              }
                            }}
                          >
                            <span className="add-product__category-label">
                              {category.label}
                            </span>
                            {category.hasSubcategories && (
                              <img
                                src="/images/drop-down-icon.svg"
                                alt="Expand category"
                                className={`add-product__expand-icon ${expandedCategories[category.id] ? 'expanded' : ''}`}
                              />
                            )}
                          </button>

                          {expandedCategories[category.id] && category.hasSubcategories && (
                            <div className="add-product__subcategories-panel">
                              <div className="add-product__subcategories">
                                {category.subcategories?.map((subcategory) => (
                                                                     <button
                                     key={subcategory.id}
                                     type="button"
                                     className={`add-product__subcategory-btn ${formData.subcategory === subcategory.id ? 'active' : ''}`}
                                     onClick={() => setFormData(prev => ({ 
                                       ...prev, 
                                       category: category.id,
                                       subcategory: subcategory.id 
                                     }))}
                                   >
                                     {subcategory.label}
                                   </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {errors.category && (
                  <p className="add-product__field-error">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* ФОТО/ВІДЕО */}
          <div className="add-product__section">
            <h2 className="add-product__section-title">
              {t('form.photoVideo', 'ФОТО/ВІДЕО')}
            </h2>

            <div className="add-product__section-content">
              <p className="add-product__file-upload-instructions">
                {t('form.photoInstructions', 'Перше фото буде на обкладинці оголошення. Перетягніть, щоб змінити порядок фото')}
                {isMobile && (
                  <span className="mobile-info">
                    {files.length < 4 ? ` (Можна додати ще ${4 - files.length} фото)` : ' (Максимум фото досягнуто)'}
                  </span>
                )}
              </p>

              <div
                className="add-product__file-upload-grid"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {/* Первый слот - загрузка */}
                <div className="add-product__file-upload-slot upload-btn">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden-file-input"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    <Paperclip className="h-6 w-6" />
                    <span>
                      {t('form.addFiles', 'Додати файли')}
                    </span>
                  </button>
                </div>

                                                  {/* Слоты для файлов */}
                 {useMemo(() => 
                   Array.from({ length: 4 }, (_, index) => {
                     // Показываем все заполненные слоты + минимум 1 пустой слот
                     let shouldShowSlot = true;
                     
                     if (isMobile) {
                       // На мобильных: показываем все заполненные слоты + 1 пустой
                       if (index >= files.length + 1) {
                         shouldShowSlot = false;
                       }
                     } else {
                       // На десктопе: показываем все слоты
                       if (index >= 4) {
                         shouldShowSlot = false;
                       }
                     }
                     
                     if (!shouldShowSlot) return null;
                     
                     return (
                       <div key={index} className={`add-product__file-upload-slot ${files[index] ? 'file-preview' : 'empty'}`}>
                         {files[index] ? (
                           <>
                             <img
                               src={filePreviews[index] || "/images/golden-mine.jpg"}
                               alt={`File ${index + 1}`}
                             />
                             <button
                               type="button"
                               onClick={() => removeFile(index)}
                               className="add-product__file-upload-remove-btn remove-btn"
                             >
                               <X />
                             </button>
                           </>
                         ) : (
                           <div className="placeholder">
                             {isMobile ? (
                               <button
                                 type="button"
                                 onClick={() => fileInputRef.current?.click()}
                                 className="placeholder-add-btn"
                               >
                                 <X className="placeholder-add-icon" />
                               </button>
                             ) : (
                               <img
                                 src="/images/img-icon.svg"
                                 alt="Add image"
                                 className="placeholder-icon"
                               />
                             )}
                           </div>
                         )}
                       </div>
                     );
                   }).filter(Boolean)
                 , [isMobile, files.length, files, filePreviews, removeFile])}
              </div>

              {errors.files && (
                <p className="add-product__field-error">{errors.files}</p>
              )}
            </div>
          </div>

          {/* ОПИС */}
          <div className="add-product__section">
            <h2 className="add-product__section-title">
              {t('form.description', 'ОПИС')}
            </h2>

            <div className="add-product__section-content">
              <div className="add-product__description">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="add-product__field-textarea"
                  placeholder={t('form.descriptionPlaceholder', 'Опишіть ваш продукт детально')}
                />
                <div className="add-product__description-counter">
                  {formData.description.length}/9000
                </div>
              </div>

              <p className="add-product__description-hint">
                {t('form.descriptionMinLength', 'Введіть щонайменше 40 символів')}
              </p>

              {errors.description && (
                <p className="add-product__field-error">{errors.description}</p>
              )}
            </div>
          </div>

          {/* Ціна */}
          <div className="add-product__section">

            <div className="add-product__section-content">
              <div className="add-product__price">
                {/* Поле ціни */}
                <div>
                  <label className="add-product__field-label">
                    {t('form.enterPrice', 'Вкажіть ціну*')}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="add-product__field-input"
                    placeholder="0"
                    min="0"
                  />
                </div>

                {/* Валюты */}
                <div className="add-product__price-currencies">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, currency: currency.code }))}
                      className={`add-product__price-currency-btn ${formData.currency === currency.code ? 'active' : ''
                        }`}
                    >
                      {currency.label}
                    </button>
                  ))}
                </div>

                                 {/* Договірна ціна */}
                 <div className="add-product__price-negotiable">
                   <input
                     type="checkbox"
                     name="negotiablePrice"
                     checked={formData.negotiablePrice}
                     onChange={handleInputChange}
                     id="negotiablePrice"
                   />
                   <label htmlFor="negotiablePrice">
                     {t('form.negotiablePrice', 'Ціна договірна')}
                   </label>
                   {formData.negotiablePrice && (
                     <div className="add-product__negotiable-note">
                       {t('form.negotiableNote', 'Ціна вказується для орієнтації, можна торгуватися')}
                     </div>
                   )}
                 </div>
              </div>

              {errors.price && (
                <p className="add-product__field-error">{errors.price}</p>
              )}
            </div>
          </div>

          {/* АВТОПРОДОВЖЕННЯ */}
          <div className="add-product__section">
            <div className="add-product__auto-renewal-toggle">
              <h2 className="add-product__section-title">
                {t('form.autoRenewal', 'АВТОПРОДОВЖЕННЯ')}

              </h2>

              <div
                className={`toggle-switch ${formData.autoRenewal ? 'active' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, autoRenewal: !prev.autoRenewal }))}
              /></div>
            <div className="add-product__section-content">

              <span className="add-product__auto-renewal-toggle-info">
                {t('form.autoRenewalInfo', 'Оголошення буде деактивовано через 30 днів')}
              </span>

            </div>
          </div>


          {/* Кнопки */}
          <div className="add-product__buttons">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="add-product__buttons-preview"
            >
              {t('form.preview', 'ПОПЕРЕДНІЙ ПЕРЕГЛЯД')}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="add-product__buttons-submit"
            >
              {isSubmitting ? (
                <span className="loading">
                  <div className="spinner"></div>
                  {t('form.publishing', 'Публікація...')}
                </span>
              ) : (
                t('form.publish', 'ОПУБЛІКУВАТИ')
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
