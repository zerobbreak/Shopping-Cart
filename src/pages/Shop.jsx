import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ShopFilter from "../components/ShopFilter";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../api/api"; // Rename getCatgories to getCategories

const Shop = () => {
  const [data, setData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const categories = await getCategories(); // Use getCategories instead of getCatgories
        setData(products);
        setCategoryData(categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const categories = categoryData;

  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    price: 0,
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filtering logic to the data array based on selected filters
  const filteredData = data.filter((item) => {
    // Implement your filtering logic here
    // Example: filter by category, size, and price range
    return (
      (selectedFilters.category === "" ||
        item.category === selectedFilters.category) &&
      (selectedFilters.size === "" || item.size === selectedFilters.size) &&
      (selectedFilters.price === 0 || item.price <= selectedFilters.price)
    );
  });

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex gap-10">
        <ShopFilter
          categories={categories}
          handleFilterChange={handleFilterChange}
        />
        <div className="flex items-center flex-wrap">
          {filteredData.map((item) => (
            <ProductCard key={item.id} product={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
