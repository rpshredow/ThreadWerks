import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import style from "./Payment.module.css";
import { savePaymentMethod } from "../slices/cartSlice";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <div className={style.container}>
        <h2>Payment Method</h2>
        <form onSubmit={submitHandler}>
          <div className={style.form_container}>
            <input
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="PayPal">Paypal or Credit Card</label>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
