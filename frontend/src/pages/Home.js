import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div className="card_container">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="card_container">
          {products.map((product) => (
            <Card product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
