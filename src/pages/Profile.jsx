import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { ArrowLeft, User, Settings, Heart, ShoppingCart, Plus, LogOut } from "lucide-react"
import { MarketplaceButton } from "@/components/ui/marketplace-button"

export default function Profile() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("overview")

  const profileStats = {
    totalProducts: 12,
    totalSales: 45,
    totalRevenue: "$2,450",
    rating: 4.8
  }

  const recentProducts = [
    { id: 1, name: "Golden Mine Creative", status: "active", views: 156, sales: 8 },
    { id: 2, name: "Premium Banner Pack", status: "pending", views: 89, sales: 3 },
    { id: 3, name: "Social Media Kit", status: "active", views: 234, sales: 15 }
  ]

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "products", label: "My Products", icon: Plus },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="marketplace-container max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/"
            className="inline-flex items-center text-brand-green hover:text-brand-green/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('pages.backToHome')}
          </Link>
          
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-brand-green" />
            <h1 className="text-3xl font-bold">{t('pages.profile')}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-lg p-6">
              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-brand-green rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="h-10 w-10 text-black" />
                </div>
                <h2 className="text-xl font-semibold mb-1">John Doe</h2>
                <p className="text-muted-foreground">Premium Seller</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.floor(profileStats.rating) ? "bg-yellow-400" : "bg-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {profileStats.rating}
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-brand-green text-black"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>

              {/* Logout Button */}
              <button className="w-full flex items-center gap-3 px-4 py-3 mt-6 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-card rounded-lg shadow-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-brand-green">{profileStats.totalProducts}</h3>
                    <p className="text-muted-foreground">Total Products</p>
                  </div>
                  <div className="bg-card rounded-lg shadow-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-blue-500">{profileStats.totalSales}</h3>
                    <p className="text-muted-foreground">Total Sales</p>
                  </div>
                  <div className="bg-card rounded-lg shadow-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-green-500">{profileStats.totalRevenue}</h3>
                    <p className="text-muted-foreground">Total Revenue</p>
                  </div>
                  <div className="bg-card rounded-lg shadow-lg p-6 text-center">
                    <h3 className="text-2xl font-bold text-yellow-500">{profileStats.rating}</h3>
                    <p className="text-muted-foreground">Rating</p>
                  </div>
                </div>

                {/* Recent Products */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Recent Products</h3>
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.status === "active" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }`}>
                              {product.status}
                            </span>
                            <span>{product.views} views</span>
                            <span>{product.sales} sales</span>
                          </div>
                        </div>
                        <Link 
                          to={`/product/${product.id}`}
                          className="text-brand-green hover:text-brand-green/80 transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-card rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link 
                      to="/add-product"
                      className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-green transition-colors"
                    >
                      <Plus className="h-6 w-6 text-brand-green" />
                      <div>
                        <h4 className="font-medium">Add New Product</h4>
                        <p className="text-sm text-muted-foreground">Create and list a new product</p>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/favorites"
                      className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-brand-green transition-colors"
                    >
                      <Heart className="h-6 w-6 text-brand-green" />
                      <div>
                        <h4 className="font-medium">View Favorites</h4>
                        <p className="text-sm text-muted-foreground">See your saved products</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="bg-card rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">My Products</h3>
                  <Link to="/add-product">
                    <MarketplaceButton variant="green">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </MarketplaceButton>
                  </Link>
                </div>
                <p className="text-muted-foreground">Product management features coming soon...</p>
              </div>
            )}

            {activeTab === "sales" && (
              <div className="bg-card rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Sales History</h3>
                <p className="text-muted-foreground">Sales tracking features coming soon...</p>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="bg-card rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">My Favorites</h3>
                <Link to="/favorites" className="text-brand-green hover:text-brand-green/80 transition-colors">
                  View all favorites →
                </Link>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-card rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
                <p className="text-muted-foreground">Settings features coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
