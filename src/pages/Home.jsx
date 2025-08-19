import { useState, useEffect } from "react"
import { Hero } from "@/components/Hero"
import { ProductCard } from "@/components/ProductCard"
import { SearchBar } from "@/components/SearchBar"
import { FilterBar } from "@/components/FilterBar"
import { useCart } from "@/contexts/CartContext"
import productsData from "@/data/products.json"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [products] = useState(productsData)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const { addToCart } = useCart()
  const { toast } = useToast()

  // Get unique categories
  const categories = Array.from(new Set(products.map(p => p.category)))

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory])

  const handleAddToCart = (product) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <section className="marketplace-container py-12">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <FilterBar 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No products found.</p>
          </div>
        )}
      </section>
    </div>
  )
}
