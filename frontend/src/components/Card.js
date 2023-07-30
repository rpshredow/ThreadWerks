import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ product }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        <Link to={`/product/${product._id}`}>
          <img
            alt="product"
            className={styles.img}
            src={product.images[0].url}
          />
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
