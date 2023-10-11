import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import style from "./Shipping.module.css";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 />
      <div className={style.container}>
        <h2>Shipping</h2>
        <form onSubmit={submitHandler}>
          <div className={style.form_container}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={style.form_container}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className={style.form_container}>
            <label htmlFor="postalCode">Postal Code:</label>
            <input
              type="text"
              placeholder="Enter Password"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className={style.form_container}>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
