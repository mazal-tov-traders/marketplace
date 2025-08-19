import { Link } from "react-router-dom"
import { MarketplaceButton } from "@/components/ui/marketplace-button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-green mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <MarketplaceButton variant="green">
            Go Home
          </MarketplaceButton>
        </Link>
      </div>
    </div>
  )
}
