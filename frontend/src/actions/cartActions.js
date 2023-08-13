import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart =
  (id, qty, color, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    const cartItem = {
      product: data._id,
      name: data.name,
      description: data.description,
      images: data.images,
      options: data.options,
      price: data.price,
      qtyBought: data.qtyBought,
      category: data.category,
      countInStock: data.countInStock,
      color,
      size,
      qty,
    };

    dispatch({
      type: CART_ADD_ITEM,
      payload: cartItem,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
