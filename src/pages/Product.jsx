import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/api";
import { Oval } from "react-loader-spinner";
import Navbar from "../components/Navbar";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["White", "Blue", "Black"];
  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProduct({ id });
        setProduct(productData);
      } catch (error) {
        console.log("Error fetching product details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSizeClick = (size) => {
    setActiveSize(size === activeSize ? null : size);
  };

  const handleColorClick = (color) => {
    setActiveColor(color === activeColor ? null : color);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(existingCart));
    setAddedToCart(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval color="#4CAF50" height={50} width={50} />
      </div>
    );
  }

  // Check if the product category is "electronics"
  const isTechProduct = product.category.toLowerCase() === "electronics";
  const isJewelery = product.category.toLowerCase() === "jewelery";

  // Render product details once fetched
  return (
    <div>
      <Navbar/>
      <div className="flex items-center justify-center p-10">
        <div className="flex items-center justify-between w-full max-w-screen mx-auto">
          <div className="w-2/3 pr-5">
            <h2 className="font-bold text-2xl">{product.title}</h2>
            <p className="font-light text-base">{product.category}</p>
            <p className="font-medium text-xl">${product.price}</p>
            <p className="font-normal">{product.description}</p>
            <p
              className={`mt-5 ${isTechProduct ? "mb-10" : ""} ${
                isJewelery ? "mb-10" : ""
              }`}
            >
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
            {!isTechProduct && !isJewelery && (
              <div className="flex mt-5">
                {/* Size buttons */}
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`mr-3 ${
                      activeSize === size
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    } p-2`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
            {!isTechProduct && !isJewelery && (
              <div className="flex mt-3">
                {/* Color color boxes */}
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`mr-3 w-8 h-8 cursor-pointer mb-10 ${
                      activeColor === color
                        ? `bg-${color.toLowerCase()}-500`
                        : "bg-gray-200"
                    } rounded-full`}
                    onClick={() => handleColorClick(color)}
                  />
                ))}
              </div>
            )}
            <button
            onClick={handleAddToCart}
              className={`bg-black text-white p-2 rounded text-center px-5 ${
                addedToCart ? "bg-gray-500 cursor-not-allowed" : "" // Disable the button if added to the cart
              }`}
              disabled={addedToCart} // Disable the button if added to the cart
            >
              {addedToCart ? "Added" : "Add to Cart"}
            </button>
          </div>
          <div className="w-1/3 p-5">
            <img className="w-56 ml-10" src={product.image} alt={product.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
