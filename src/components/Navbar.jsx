import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch the cart count from localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cartData.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  const links = [
    {
      to: "/",
      title: "Home",
    },
    {
      to: "/about",
      title: "About",
    },
    {
      to: "/blog",
      title: "Blog",
    },
    {
      to: "/shop",
      title: "Shop",
    },
  ];

  return (
    <div className="w-full bg-slate-50 px-8 py-4 flex justify-between items-center">
      <img className="w-16" src="/assets/logo.png" alt="logo" />
      <div className="flex gap-10">
        {links.map((link, index) => (
          <Link
            className={`${
              location.pathname === link.to ? "underline" : "no-underline"
            }`}
            key={index}
            to={link.to}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-10">
        <IoSearch />
        <FaShoppingCart onClick={() => navigate("/cart")} />
        {cartCount > 0 && <span className="bg-black text-white p-1 rounded">{cartCount}</span>}
      </div>
    </div>
  );
};

export default Navbar;
