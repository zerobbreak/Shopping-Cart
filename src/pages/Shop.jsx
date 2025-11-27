import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ShopFilter from "../components/ShopFilter";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../api/api"; // Rename getCatgories to getCategories

const Shop = () => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [selectedFilters, setSelectedFilters] = useState({
    category: searchParams.get("category") || "",
    price: 1000,
    sort: "default",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const categories = await getCategories();
        setData(products);
        setCategoryData(categories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    if (categoryParam !== null) {
      setSelectedFilters(prev => ({ ...prev, category: categoryParam }));
    }
    if (searchParam !== null) {
      setSelectedFilters(prev => ({ ...prev, search: searchParam }));
    }
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredData = data
    .filter((item) => {
      const matchesCategory = selectedFilters.category === "" || item.category === selectedFilters.category;
      const matchesPrice = item.price <= selectedFilters.price;
      const matchesSearch = item.title.toLowerCase().includes(selectedFilters.search.toLowerCase());

      return matchesCategory && matchesPrice && matchesSearch;
    })
    .sort((a, b) => {
      switch (selectedFilters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <ShopFilter
            categories={categoryData}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />

          {/* Product Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">
                {selectedFilters.category ? (
                  <span className="capitalize">{selectedFilters.category}</span>
                ) : (
                  "All Products"
                )}
              </h2>
              <p className="text-secondary">
                Showing {filteredData.length} results
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : filteredData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredData.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-secondary">No products found matching your criteria.</p>
                <button
                  onClick={() => setSelectedFilters({ category: "", price: 1000, sort: "default", search: "" })}
                  className="mt-4 text-accent hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
