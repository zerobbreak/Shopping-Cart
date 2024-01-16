import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FeaturedCard from "../components/FeaturedCard";
import { getProductsLimit } from "../api/api";

const Home = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductsLimit(3);
        setData(products);
        console.log(products);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])
  return (
    <div className="w-full h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center px-14 justify-between mx-auto max-w-screen">
        <div className="text-center p-14">
          <h2 className="text-3xl font-bold mb-4">
            Welcome to the online store
          </h2>
          <p>
            Explore a wide range of products and find the perfect items for your
            needs. From electronics to fashion, we've got you covered. Enjoy a
            seamless shopping experience with our user-friendly interface and
            secure checkout process.
          </p>
        </div>
        <img
          className="w-80 rounded"
          src="/assets/homepage.jpg"
          alt="clothing pose"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold m-6 text-center">Featured</h2>
        <div className="flex justify-evenly items-center gap-16 py-10">
          {data.map((item, index) => (
            <FeaturedCard key={index} title={item.title} image={item.image} category={item.category}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
