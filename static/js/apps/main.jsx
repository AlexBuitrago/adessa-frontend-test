import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const formatCurrency = ({ price, currency }) => `${currency}${price}`;

const CartLink = ({ cart }) => {
  const total = cart.reduce((sum, product) => (sum += product.price), 0);

  return (
    <a href="#cart" className="cart-link">
      Total: ${total}
    </a>
  );
};

const Product = ({ product, onEventCart, text, classButton }) => {
  return (
    <div className="product">
      <img src={product.imageURL} />
      <h1>{product.name}</h1>
      <p>{formatCurrency(product)}</p>
      <button className={classButton} onClick={() => onEventCart(product)}>
        {text}
      </button>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (product) =>
    setCart(cart.filter((p) => p.id !== product.id));

  useEffect(() => {
    axios
      .get("http://localhost:1337/items")
      .then(({ data }) => setProducts(data.catalog))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <div className="container-cart">
        <CartLink cart={cart} />
        <div className="items">
          {cart.map((product) => (
            <Product
              key={Math.random()}
              product={product}
              onEventCart={() => removeFromCart(product)}
              text="Remove"
              classButton="removeButton"
            />
          ))}
        </div>
      </div>

      <div className="products">
        {products.map((product) => (
          <Product
            key={Math.random()}
            product={product}
            onEventCart={addToCart}
            text="Add Product"
            classButton="addButton"
          />
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
