import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>
        <h3>Socials</h3>
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Twitter</p>
      </div>
      <div>
        <h3>About Us</h3>
        <p>Contact</p>
        <p>FAQ</p>
      </div>
    </div>
  );
};

export default Footer;
