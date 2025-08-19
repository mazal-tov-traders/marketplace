import { Filter } from "lucide-react"

export const FilterBar = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-4 w-4 text-gray-600" />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  )
}
