import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import style from "./PlaceOrder.module.css";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className={style.container}>
        <div>
          <h3>Shipping</h3>
          <p>
            <strong>Address: </strong>
            {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
          </p>
          <h3>Payment Method </h3>
          <p>
            <strong>Method: </strong>
            {cart.paymentMethod}
          </p>
          <h3>Order Items </h3>
          <div>
            {cart.cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div className={style.item} key={index}>
                    <img
                      className={style.thumbnail_image}
                      src={item.images[0].url}
                      alt={item.name}
                    />
                    <div className={style.name_price}>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <h3>Order Summary</h3>
          <p>
            <strong>Items: </strong>${cart.itemsPrice}
          </p>
          <p>
            <strong>Shipping: </strong>${cart.shippingPrice}
          </p>
          <p>
            <strong>Tax: </strong>${cart.taxPrice}
          </p>

          {error && <p>{error}</p>}

          <button
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {/* {isLoading && <p>Loading...</p>} */}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
