import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./Product.module.css";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const Product = ({ match }) => {
  const [selectedQty, setSelectedQty] = useState(0);
  const [maxQty, setMaxQty] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Not Selected");
  const [selectedColor, setSelectedColor] = useState("Not Selected");
  const [sizes, setSizes] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: product, loading, error } = useGetProductDetailsQuery(id);

  const addToCartHandler = () => {
    const qty = selectedQty;
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }

  useEffect(() => {
    getSizeColorQuantity(selectedSize, selectedColor);
  }, [selectedSize, selectedColor]);

  const setOptions = (color) => {
    setSelectedColor(color);
    setSelectedSize("");
    setSelectedQty(0);
    const size = product.options
      .filter((option) => option.color === color)
      .map((option) => option.size);

    setSizes(size);
  };

  const getSizeColorQuantity = (size, color) => {
    const selectedOption = product?.options?.find(
      (option) => option.size === size && option.color === color
    );

    if (selectedOption) {
      setMaxQty(selectedOption.quantity);
    }
  };

  const setImageNumber = (num) => {
    setActiveImage(num);
  };

  const incrementQuantity = () => {
    if (selectedQty < maxQty) {
      setSelectedQty(selectedQty + 1);
    }
  };

  const decrementQuantity = () => {
    if (selectedQty > 0) {
      setSelectedQty(selectedQty - 1);
    }
  };

  const uniqueSizes = [
    ...new Set(product?.options?.map((option) => option?.size)),
  ];

  const uniqueColors = [
    ...new Set(product?.options?.map((option) => option?.color)),
  ];

  // Add a conditional check for product.images
  // const images = product.images || [];

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className={style.container}>
          <div className={style.images}>
            <Link onClick={toggleModal}>
              <img
                className={style.image}
                alt="product"
                src={product?.images[activeImage]?.url}
              />
            </Link>
            <div className={style.container_images}>
              {product?.images.map((image, index) => (
                <Link key={image._id} onClick={() => setImageNumber(index)}>
                  <div className={style.thumb_image_container}>
                    <img
                      className={style.thumb_image}
                      alt="small pic"
                      src={image.url}
                    />
                    <div className={style.thumb_image_overlay}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className={style.info}>
            <h3>{product?.name}</h3>
            <p>{product?.description}</p>
            <p>${product?.price}</p>

            <div className={style.colors_container}>
              <p>Colors: </p>

              {uniqueColors.map((color, index) => (
                <button
                  className={selectedColor === color ? "highlight-button" : ""}
                  onClick={() => setOptions(color)}
                  key={index}
                >
                  {color}
                </button>
              ))}
            </div>
            <div className={style.sizes_container}>
              <p>Sizes: </p>
              {sizes.length === 0
                ? uniqueSizes.map((size, index) => (
                    <button onClick={() => setSelectedSize(size)} key={index}>
                      {size}
                    </button>
                  ))
                : sizes.map((size, index) => (
                    <button
                      className={
                        selectedSize === size ? "highlight-button" : ""
                      }
                      onClick={() => setSelectedSize(size)}
                      key={index}
                    >
                      {size}
                    </button>
                  ))}
            </div>
            <div className={style.qty_container}>
              <button
                className={style.qty_button}
                onClick={decrementQuantity}
                disabled={selectedQty === 0}
              >
                -
              </button>
              <p>Qty: {selectedQty}</p>
              <button
                className={style.qty_button}
                onClick={incrementQuantity}
                disabled={selectedQty === maxQty}
              >
                +
              </button>
            </div>
            <div className={style.status}>
              {/* <p>Color: {selectedColor}</p>
              <p>Size: {selectedSize}</p> */}
              <p>In Stock: {maxQty > 10 ? "More then 10" : maxQty}</p>
            </div>
            <button
              disabled={maxQty === 0 || selectedQty == 0}
              className={style.add_to_cart}
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}

      {modal && (
        <div className={style.modal}>
          <div onClick={toggleModal} className={style.overlay} />
          <div className={style.modal_container}>
            <img alt="modal" src={product?.images[activeImage]?.url} />
            <button className={style.close_modal} onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
