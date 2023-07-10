import "./App.css";
import Card from "./components/Card";
import products from "./products";

function App() {
  return (
    <>
      <div className="card_container">
        {products.map((product) => (
          <Card product={product} />
        ))}
      </div>
    </>
  );
}

export default App;
