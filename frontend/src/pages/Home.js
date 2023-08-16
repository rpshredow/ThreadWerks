import React from "react";
import Card from "../components/Card";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const Home = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <div>{isError?.data?.message || isError.error}</div>
      ) : (
        <div className="card_container">
          {products?.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
