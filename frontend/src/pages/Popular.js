import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const AllDesigns = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      const sortedData = data.sort((a, b) => b.qtyBought - a.qtyBought);

      setProducts(sortedData);
    };

    fetchProducts();
  }, []);

  return (
    <div className="card_container">
      {products.map((product) => (
        <Card product={product} />
      ))}
    </div>
  );
};

export default AllDesigns;
