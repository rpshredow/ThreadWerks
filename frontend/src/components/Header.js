import React, { useState, useRef, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import header from "./Header.module.css";

const Header = () => {
  const [openBrowse, setOpenBrowse] = useState(false);
  const [openAdult, setOpenAdult] = useState(false);
  const [openKid, setOpenKid] = useState(false);
  const browseMenuRef = useRef();
  const adultMenuRef = useRef();
  const kidMenuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !browseMenuRef.current.contains(event.target) &&
        !adultMenuRef.current.contains(event.target) &&
        !kidMenuRef.current.contains(event.target)
      ) {
        setOpenBrowse(false);
        setOpenAdult(false);
        setOpenKid(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleBrowseMenu = () => {
    setOpenBrowse(!openBrowse);
    setOpenAdult(false);
    setOpenKid(false);
  };

  const toggleAdultMenu = () => {
    setOpenAdult(!openAdult);
    setOpenBrowse(false);
    setOpenKid(false);
  };

  const toggleKidMenu = () => {
    setOpenKid(!openKid);
    setOpenBrowse(false);
    setOpenAdult(false);
  };

  return (
    <div className={header.container}>
      <Link className={header.link} to={"/"}>
        <h2>ThreadWerks</h2>
      </Link>
      <div className={header.menu}>
        <div ref={browseMenuRef} className={header.navitem}>
          <Link href="#" className={header.link} onClick={toggleBrowseMenu}>
            Browse
          </Link>
          {openBrowse && (
            <div className={header.dropdownMenu}>
              <ul className={header.list}>
                <Link className={header.link} to={"/all"}>
                  <li className={header.list_item}>All Designs</li>
                </Link>
                <li className={header.list_item}>Most Popular</li>
              </ul>
            </div>
          )}
        </div>

        <div ref={adultMenuRef} className={header.navitem}>
          <Link href="#" className={header.link} onClick={toggleAdultMenu}>
            Adult Apparel
          </Link>
          {openAdult && (
            <div className={header.dropdownMenu}>
              <ul className={header.list}>
                <li className={header.list_item}>T-Shirts</li>
                <li className={header.list_item}>Tank Tops</li>
                <li className={header.list_item}>Hoodies</li>
              </ul>
            </div>
          )}
        </div>

        <div ref={kidMenuRef} className={header.navitem}>
          <Link href="#" className={header.link} onClick={toggleKidMenu}>
            Kids Apparel
          </Link>
          {openKid && (
            <div className={header.dropdownMenu}>
              <ul className={header.list}>
                <li className={header.list_item}>Kids T-Shirts</li>
                <li className={header.list_item}>Kids Tank Tops</li>
                <li className={header.list_item}>Kids Hoodies</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={header.menu}>
        <Link className={header.link} to={"/login"}>
          <div className={header.item}>Login</div>
        </Link>
        <Link className={header.link} to={"/signup"}>
          <div className={header.item}>Sign Up</div>
        </Link>
        <Link className={header.link} to={"/cart"}>
          <div className={header.item}>Cart</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
