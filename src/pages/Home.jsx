import { useTranslation } from "react-i18next"
import { Hero } from "@/components/Hero"
import { ProductsSection } from "@/components/ProductsSection"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <Hero />
      
      {/* Products Section */}
      <ProductsSection />
    </div>
  )
}
