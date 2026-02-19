import { useState } from "react";
import ProductGrid from "./components/ProductGrid";
import AddCart from "./components/AddCart";
import "../styles/global.css";
import "../styles/layout.css";
import "./App.css";

function App() {
  const [cart, setCart] = useState({});
  const [resetTrigger, setResetTrigger] = useState(0);

  // Add or update product in cart
  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const productId = product.id;
      if (quantity === 0) {
        // Remove item if quantity is 0
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      } else {
        // Add or update item
        return {
          ...prevCart,
          [productId]: {
            ...product,
            quantity,
          },
        };
      }
    });
  };

  // Delete item from cart
  const handleDeleteItem = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  // Clear cart after order confirmation
  const handleConfirmOrder = () => {
    setCart({});
  };

  // Reset all quantities when starting a new order
  const handleStartNewOrder = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <main className="app">
      <ProductGrid onAddToCart={handleAddToCart} resetTrigger={resetTrigger} />
      <AddCart
        cart={cart}
        onDeleteItem={handleDeleteItem}
        onConfirmOrder={handleConfirmOrder}
        onStartNewOrder={handleStartNewOrder}
      />
    </main>
  );
}

export default App;
