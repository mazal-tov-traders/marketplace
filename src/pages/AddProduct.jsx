import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { MarketplaceButton } from "@/components/ui/marketplace-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Upload } from "lucide-react"

export default function AddProduct() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    hotPrice: "",
    category: "",
    tags: "",
    image: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would send the data to your backend
      console.log("Product data:", formData)
      
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

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </button>

        <div className="bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Add New Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Category */}
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

            {/* Tags */}
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
