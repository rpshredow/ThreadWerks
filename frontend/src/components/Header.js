import React from "react";
import header from "./Header.module.css";

const Header = () => {
  return (
    <div className={header.container}>
      <h2>ThreadWerks</h2>
      <div className={header.menu}>
        <div className={header.item}>Browse</div>
        <div className={header.item}>Adult Apparel</div>
        <div className={header.item}>Kids Apparel</div>
      </div>
      <div className={header.menu}>
        <div className={header.item}>Login</div>
        <div className={header.item}>Sign Up</div>
        <div className={header.item}>Cart</div>
      </div>
    </div>
  );
};

export default Header;
