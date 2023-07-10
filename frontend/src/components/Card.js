import React from "react";
import styles from "./Card.module.css";

const Card = ({ product }) => {
  return (
    <div className={styles.card_container}>
      <div>
        <img className={styles.img} src={product.image}></img>
      </div>
      <div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default Card;
