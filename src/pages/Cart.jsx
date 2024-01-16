import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = () => {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(cartData);
      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Oval color="#4CAF50" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-screen-md mx-auto">
          <h2 className="text-2xl font-bold mb-5">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="flex justify-between items-center gap-10 flex-wrap">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-center items-center gap-5 border p-4 mb-4 w-80 h-56"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-base">{item.title}</h3>
                    <p className="font-light text-sm">Price: ${item.price}</p>
                    <p className="flex gap-5 items-center mt-5">
                      Quantity:
                      <button onClick={() => handleIncreaseQuantity(item.id)}>
                        +
                      </button>
                      {item.quantity}
                      <button onClick={() => handleDecreaseQuantity(item.id)}>
                        -
                      </button>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => {
              localStorage.removeItem("cart");
            }}
            className="bg-black text-white p-2 rounded text-center px-5"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
