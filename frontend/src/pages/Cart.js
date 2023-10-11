import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.css";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className={style.container}>
      <div className={style.cart_container}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className={style.items}>
            {cartItems.map((item) => (
              <div className={style.item} key={item._id}>
                <div className={style.image_container}>
                  <img
                    className={style.image_thumb}
                    src={item.images[0].url}
                    alt={item.name}
                    fluid
                    rounded
                  />
                </div>
                <div className={style.link}>
                  <Link to={`/product/${item._id}`}>
                    <h3>{item.name}</h3>
                  </Link>
                </div>
                <p>Qty: {item.qty}</p>
                <p>Price: ${item.price}</p>
                <p>Subtotal: ${item.qty * item.price}</p>
                <button onClick={() => removeFromCartHandler(item._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={style.prices_container}>
        <h2>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
        </h2>
        <p>
          Total:{" "}
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
        </p>
        <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
