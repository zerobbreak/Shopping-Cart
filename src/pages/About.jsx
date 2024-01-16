import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="w-full h-screen bg-slate-50 text-center">
      <Navbar />
      <h2 className="mt-10 text-2xl font-bold text-slate-500">About us</h2>
      <div className="container mx-auto p-20">
        <p className="text-gray-700">
          Welcome to our online store! We are passionate about providing
          high-quality products and an exceptional shopping experience for our
          customers. Our goal is to make your online shopping journey enjoyable,
          secure, and convenient.
        </p>
        <p className="mt-4 text-gray-700">
          Feel free to explore our wide range of products, from electronics to
          fashion and more. If you have any questions or need assistance, our
          friendly customer support team is here to help you. Thank you for
          choosing us for your online shopping needs!
        </p>
      </div>{" "}
    </div>
  );
};

export default About;
