import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"
import { useProducts } from "@/contexts/ProductsContext"

export default function AddProduct() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { addProduct } = useProducts()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    hotPrice: "",
    category: "",
    tags: [],
    image: "",
    // Новые поля для маркетплейса
    brand: "HOLYTRAFF",
    type: "static",
    subtype: "single",
    platforms: [],
    promotionalText: "",
    overlayText: "",
    chatCount: "1"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    } catch (error) {
      console.error("Error in handleInputChange:", error)
    }
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setIsSubmitting(true)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log("Form data before adding:", formData)
      
      // Add product to context
      const newProduct = addProduct(formData)
      console.log("Product added successfully:", newProduct)
      
      // Show success message and redirect
      alert("Product added successfully!")
      navigate("/")
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Error adding product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = ["electronics", "fashion", "home", "sports", "books", "other"]
  const platformOptions = ["FB", "ASO", "TikTok", "UAC", "Google Ads", "Instagram", "YouTube"]
  const typeOptions = [
    { value: "static", label: t("product.types.static") },
    { value: "dynamic", label: t("product.types.dynamic") },
    { value: "video", label: t("product.types.video") }
  ]
  const subtypeOptions = [
    { value: "single", label: t("product.subtypes.single") },
    { value: "pack", label: t("product.subtypes.pack") },
    { value: "collection", label: t("product.subtypes.collection") }
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('nav.back')}
        </button>

        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">{t('pages.addProduct')}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Product Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="HOLYTRAFF"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>

            {/* Price Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="oldPrice">Old Price</Label>
                <Input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  placeholder="0.00"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hotPrice">Hot Price</Label>
                <Input
                  id="hotPrice"
                  name="hotPrice"
                  type="number"
                  placeholder="0.00"
                  value={formData.hotPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Category and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="Enter tags separated by commas"
                  value={formData.tags}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-muted-foreground">
                  Separate tags with commas (e.g., electronics, wireless, premium)
                </p>
              </div>
            </div>

            {/* Marketplace Specific Fields */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Marketplace Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Type */}
                <div className="space-y-2">
                  <Label htmlFor="type">Product Type</Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    {typeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product Subtype */}
                <div className="space-y-2">
                  <Label htmlFor="subtype">Product Subtype</Label>
                  <select
                    id="subtype"
                    name="subtype"
                    value={formData.subtype}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  >
                    {subtypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Platforms */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="platforms">Platforms</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {platformOptions.map((platform) => (
                    <label key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={platform}
                        checked={formData.platforms.includes(platform)}
                        onChange={(e) => {
                          try {
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                platforms: [...prev.platforms, platform]
                              }))
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                platforms: prev.platforms.filter(p => p !== platform)
                              }))
                            }
                          } catch (error) {
                            console.error("Error in platform checkbox change:", error)
                          }
                        }}
                        className="rounded border-gray-300 text-brand-green focus:ring-brand-green"
                      />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Promotional Text */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="promotionalText">Promotional Text</Label>
                <Textarea
                  id="promotionalText"
                  name="promotionalText"
                  placeholder="BÓNUS DE BOAS-VINDAS ATÉ 1500€ + 150 FREE SPINS"
                  value={formData.promotionalText}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>

              {/* Overlay Text */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="overlayText">Overlay Text on Image</Label>
                <Input
                  id="overlayText"
                  name="overlayText"
                  type="text"
                  placeholder="GOLDEN MINE"
                  value={formData.overlayText}
                  onChange={handleInputChange}
                />
              </div>

              {/* Chat Count */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="chatCount">Chat Count</Label>
                <Input
                  id="chatCount"
                  name="chatCount"
                  type="number"
                  placeholder="1"
                  value={formData.chatCount}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Submit Button */}
            <MarketplaceButton
              type="submit"
              className="w-full"
              variant="green"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-2" />
                  Add Product
                </>
              )}
            </MarketplaceButton>
          </form>
        </div>
      </div>
    </div>
  )
}
