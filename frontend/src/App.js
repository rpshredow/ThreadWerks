import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

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
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import OrderList from "./pages/admin/OrderList";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/all" element={<AllDesigns />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/tshirts" element={<TShirts />} />
        <Route path="/tanktops" element={<TankTops />} />
        <Route path="/hoodies" element={<Hoodies />} />
        <Route path="/longsleeves" element={<LongSleeves />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<Order />} />
        </Route>

        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderList />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
