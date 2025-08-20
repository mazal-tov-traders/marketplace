import { Filter } from "lucide-react"

export const FilterBar = ({ selectedCategory, onCategoryChange, categories }) => {
  return (
    <div className="filter-bar">
      <Filter className="filter-bar__icon" />
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="filter-bar__select"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}
