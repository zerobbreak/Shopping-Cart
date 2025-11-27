import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedCard from "../components/FeaturedCard";
import { getProductsLimit } from "../api/api";
import { motion } from "framer-motion";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsLimit(3);
        setData(products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1 text-center md:text-left z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              New Collection 2024
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Perfect Style
              </span>
            </h1>
            <p className="text-lg text-secondary mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Explore a wide range of products and find the perfect items for your
              needs. From electronics to fashion, we've got you covered.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                Shop Now
              </button>
              <button className="px-8 py-3 bg-white text-primary border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl -z-10" />
            <img
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              src="/assets/homepage.jpg"
              alt="clothing pose"
            />
          </motion.div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Featured Products</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {data.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeaturedCard
                title={item.title}
                image={item.image}
                category={item.category}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
