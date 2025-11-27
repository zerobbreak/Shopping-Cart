import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const links = [
    { to: "/", title: "Home" },
    { to: "/shop", title: "Shop" },
    { to: "/blog", title: "Blog" },
    { to: "/about", title: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary tracking-tight">
            Store<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.to
                  ? "text-accent"
                  : "text-secondary hover:text-primary"
                }`}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-8 py-1 text-sm border border-slate-200 rounded-full focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all w-48"
            />
            <button type="submit" className="absolute right-2 text-secondary hover:text-primary transition-colors">
              <IoSearch size={18} />
            </button>
          </form>

          <button className="md:hidden text-secondary hover:text-primary transition-colors">
            <IoSearch size={22} />
          </button>

          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <IoCartOutline size={24} className="text-secondary hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
              >
                {cartCount}
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
