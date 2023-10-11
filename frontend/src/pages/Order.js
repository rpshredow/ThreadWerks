import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import style from "./Order.module.css";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        // toast.success('Payment Successful')
      } catch (err) {
        // toast.error(err?.data?.message || err.message)
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    // toast.success('Payment Successful')
  }

  function onError(err) {
    // toast.error(err.message)
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      // toast.success('Order Delivered')
    } catch (err) {
      // toast.error(err?.data?.message || err.message)
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <div className={style.container}>
          <div>
            <h2>Order: {order._id}</h2>
            <h3>Shipping</h3>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong> {order.user.email}
            </p>
            <p>
              <strong>Address: </strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <p>Delivered on {order.deliveredAt}</p>
            ) : (
              <p>Not Delivered</p>
            )}
            <h3>Payment Method</h3>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? <p>Paid on {order.paidAt}</p> : <p>Not Paid</p>}
            <h3>Order Items</h3>
            {order.orderItems.map((item, index) => (
              <div className={style.item} key={index}>
                <img
                  className={style.thumbnail_image}
                  src={item.image}
                  alt={item.name}
                />
                <div className={style.name_price}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  {item.qty} x ${item.price} = ${item.qty * item.price}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>Order Summary</h3>
            <p>
              <strong>Items: </strong>${order.itemsPrice}
            </p>
            <p>
              <strong>Shipping: </strong>${order.shippingPrice}
            </p>
            <p>
              <strong>Tax: </strong>${order.taxPrice}
            </p>
            <p>
              <strong>Total: </strong>${order.totalPrice}
            </p>
            {!order.isPaid && (
              <div>
                {loadingPay && <p>Loading...</p>}
                {isPending ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    <button onClick={onApproveTest}>Test Pay Order</button>
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}
            {loadingDeliver && <p>Loading...</p>}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div>
                  <button onClick={deliverOrderHandler}>
                    Mark As Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
