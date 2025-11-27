import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ShopFilter = ({ categories, selectedFilters, handleFilterChange }) => {
  return (
    <div className="w-full md:w-64 flex-shrink-0 space-y-8">
      {/* Category Filter */}
      <div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-primary mb-4">Categories</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedFilters.category === "" ? "border-accent" : "border-slate-300 group-hover:border-accent"}`}>
              {selectedFilters.category === "" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
            </div>
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedFilters.category === ""}
              onChange={handleFilterChange}
              className="hidden"
            />
            <span className={`text-sm ${selectedFilters.category === "" ? "text-accent font-medium" : "text-secondary group-hover:text-primary"} transition-colors`}>
              All Categories
            </span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedFilters.category === category ? "border-accent" : "border-slate-300 group-hover:border-accent"}`}>
                {selectedFilters.category === category && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
              </div>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedFilters.category === category}
                onChange={handleFilterChange}
                className="hidden"
              />
              <span className={`text-sm capitalize ${selectedFilters.category === category ? "text-accent font-medium" : "text-secondary group-hover:text-primary"} transition-colors`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-primary mb-4">Max Price</h3>
        <div className="space-y-4">
          <div className="relative pt-1">
            <input
              type="range"
              name="price"
              min="0"
              max="1000"
              step="10"
              value={selectedFilters.price}
              onChange={handleFilterChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-accent"
              style={{
                backgroundSize: `${(selectedFilters.price / 1000) * 100}% 100%`,
                backgroundImage: `linear-gradient(to right, currentColor, currentColor)`,
                color: '#4F46E5' // Replace with your accent color hex if needed, or rely on accent-accent class if configured
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-secondary">Up to</span>
            <span className="text-lg font-bold text-primary">${selectedFilters.price}</span>
          </div>
        </div>
      </div>

      {/* Sorting */}
      <div className="bg-surface p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-primary mb-4">Sort By</h3>
        <div className="relative">
          <select
            name="sort"
            value={selectedFilters.sort}
            onChange={handleFilterChange}
            className="w-full p-3 bg-background border border-slate-200 rounded-lg text-sm text-secondary focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

ShopFilter.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedFilters: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default ShopFilter;
