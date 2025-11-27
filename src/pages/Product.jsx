import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, getProducts } from "../api/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["White", "Blue", "Black"];
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productData = await getProduct({ id });
        setProduct(productData);

        // Fetch related products
        const allProducts = await getProducts();
        const related = allProducts
          .filter(item => item.category === productData.category && item.id !== productData.id)
          .slice(0, 3);
        setRelatedProducts(related);
      } catch (error) {
        console.log("Error fetching product details: ", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSizeClick = (size) => {
    setActiveSize(size === activeSize ? null : size);
  };

  const handleColorClick = (color) => {
    setActiveColor(color === activeColor ? null : color);
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Optional: Validate size/color selection for specific categories
    const isClothing = product.category === "men's clothing" || product.category === "women's clothing";
    if (isClothing && !activeSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      ...product,
      selectedSize: activeSize,
      selectedColor: activeColor
    });

    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const isTechProduct = product.category.toLowerCase() === "electronics";
  const isJewelery = product.category.toLowerCase() === "jewelery";

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-12 mb-20">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 aspect-square md:aspect-auto md:h-[600px] relative overflow-hidden">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-contain"
              src={product.image}
              alt={product.title}
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4 leading-tight">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <span>★</span>
                  <span className="text-secondary text-sm font-medium">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
            </div>

            <p className="text-secondary leading-relaxed">
              {product.description}
            </p>

            {!isTechProduct && !isJewelery && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-primary mb-3">Select Size</h3>
                  <div className="flex gap-3">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeClick(size)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${activeSize === size
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "bg-white border border-slate-200 text-secondary hover:border-primary"
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-primary mb-3">Select Color</h3>
                  <div className="flex gap-3">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorClick(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${activeColor === color ? "border-primary scale-110" : "border-transparent hover:scale-110"
                          }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-bold text-primary mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
