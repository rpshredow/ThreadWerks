import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./Product.module.css";
import axios from "axios";

const Product = ({ match }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState({});

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active_modal");
  } else {
    document.body.classList.remove("active_modal");
  }

  const { id } = useParams();

  const fetchProduct = async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const setImageNumber = (num) => {
    setActiveImage(num);
  };

  // Add a conditional check for product.images
  const images = product.images || [];

  return (
    <>
      <div className={style.container}>
        <div className={style.images}>
          <Link onClick={toggleModal}>
            <img
              className={style.image}
              alt="product"
              src={product.images ? product.images[activeImage].url : ""}
            />
          </Link>
          <div className={style.container_images}>
            {images.map((image, index) => (
              <Link key={index} onClick={() => setImageNumber(index)}>
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
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      </div>
      {modal && (
        <div className={style.modal}>
          <div onClick={toggleModal} className={style.overlay} />
          <div className={style.modal_container}>
            <img
              alt="modal"
              src={product.images ? product.images[activeImage].url : ""}
            />
            <button className={style.close_modal} onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
