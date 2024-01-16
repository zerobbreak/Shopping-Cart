import { Route, Routes } from "react-router-dom";
import {Home, About, Blog, Shop, Cart, Product} from "./pages";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/shop/:id" element={<Product/>} />
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </main>
  );
};

export default App;
