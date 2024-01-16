import PropTypes from "prop-types";

const ShopFilter = ({ categories, handleFilterChange }) => {
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-2">Filter Options</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          className="mt-1 p-2 border rounded-md w-full"
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price Range
        </label>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="100"
          step="10"
          className="mt-1"
          onChange={handleFilterChange}
        />
        <span className="text-gray-600">Price: $0 - $100</span>
      </div>
    </div>
  );
};

ShopFilter.propTypes = {
    categories: PropTypes.array, 
    sizes: PropTypes.array, 
    handleFilterChange: PropTypes.func
}

export default ShopFilter;
