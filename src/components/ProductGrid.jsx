import ProductList from "./ProductList";
import products from "../data/products";
import "../components/ProductGrid.css";

export default function ProductDefault({ onAddToCart, resetTrigger }) {
  return (
    <section>
      <h1 className="product-grid-title">Desserts</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductList
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            resetTrigger={resetTrigger}
          />
        ))}
      </div>
    </section>
  );
}
