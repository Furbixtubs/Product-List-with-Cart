import cart from "../assets/images/icon-add-to-cart.svg";
import "./productList.css";
import { useState } from "react";

export default function ProductList({ product, onAddToCart }) {
  const { title, category, price, image } = product;
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(product, newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(product, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    onAddToCart(product, newQuantity);
  };

  return (
    <section>
      <div className="cart-container">
        <img src={image} alt={title} className="product-image" />

        {quantity === 0 ? (
          <button className="add-cart-btn" onClick={handleAddToCart}>
            <img src={cart} alt="Cart icon" />
            Add to Cart
          </button>
        ) : (
          <div className="overlay">
            <button className="qty-btn" onClick={handleDecrement}>
              -
            </button>
            <span className="qty-number">{quantity}</span>
            <button className="qty-btn" onClick={handleIncrement}>
              +
            </button>
          </div>
        )}
      </div>

      <div>
        <p className="title-para">{title}</p>
        <p>{category}</p>
        <p>${price.toFixed(2)}</p>
      </div>
    </section>
  );
}
