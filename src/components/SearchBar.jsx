import { Search } from "lucide-react"

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <Search className="search-bar__icon" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-bar__input"
      />
    </div>
  )
}
