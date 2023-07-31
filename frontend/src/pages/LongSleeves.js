import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const LongSleeves = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");

      const filteredData = data.filter(
        (data) => data.category === "long sleeve shirt"
      );

      setProducts(filteredData);
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

export default LongSleeves;
