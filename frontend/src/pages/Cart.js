import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import style from "./Cart.module.css";

const Cart = () => {
  const { id } = useParams();
  const location = useLocation();

  const productId = id;

  const searchParams = new URLSearchParams(location.search);

  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const qty = searchParams.get("qty");
  const color = searchParams.get("color");
  const size = searchParams.get("size");

  console.log(productId);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, color, size));
    }
  }, [dispatch, productId, qty, color, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={style.cart_container}>
      <div className={style.items_container}>
        <h3>Cart Page</h3>
        {cartItems.map((item, index) => (
          <div className={style.item_container} key={index}>
            {item.images && item.images.length > 0 && item.images[0].url ? (
              <img
                className={style.thumb_image}
                alt={item.name}
                src={item.images[0].url}
              />
            ) : (
              <p>No image available</p>
            )}
            <p>{item.name}</p>
            <p>Color: {item.color}</p>
            <p>Size: {item.size}</p>
            <p>Quantity: {item.qty}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: ${item.price * item.qty}</p>
            <button onClick={() => removeFromCartHandler(item.product)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
