import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import Loader from "./Loader";

const Card = ({ loading, product }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        <Link to={`/product/${product._id}`}>
          <div className={styles.image_container}>
            <img
              alt="product"
              className={styles.image}
              src={product.images[0].url}
            />
            <div className={styles.overlay}></div>
          </div>
        </Link>
      </div>
      <div>
        <Link className={styles.link} to={`/product/${product._id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default Card;
