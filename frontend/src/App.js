import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import AllDesigns from "./pages/AllDesigns";
import Popular from "./pages/Popular";
import TShirts from "./pages/TShirts";
import Hoodies from "./pages/Hoodies";
import TankTops from "./pages/TankTops";
import LongSleeves from "./pages/LongSleeves";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart/:id?" element={<Cart />} />
        <Route path="/all" element={<AllDesigns />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/tshirts" element={<TShirts />} />
        <Route path="/tanktops" element={<TankTops />} />
        <Route path="/hoodies" element={<Hoodies />} />
        <Route path="/longsleeves" element={<LongSleeves />} />
        <Route path="/" element={<Home />} exact />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
