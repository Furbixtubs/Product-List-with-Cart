import { useState } from "react";
import emptyCart from "../assets/images/illustration-empty-cart.svg";
import removeIcon from "../assets/images/icon-remove-item.svg";
import orderConfirmedIcon from "../assets/images/icon-order-confirmed.svg";
import "../components/AddCart.css";

export default function AddCart({
  cart,
  onDeleteItem,
  onConfirmOrder,
  onStartNewOrder,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedItems, setConfirmedItems] = useState([]);

  // Convert cart object to array and calculate totals
  const cartItems = Object.values(cart);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleConfirmOrder = () => {
    // Store the current cart items before clearing
    setConfirmedItems(cartItems);
    setShowConfirmation(true);
    onConfirmOrder();
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    setConfirmedItems([]);
    onStartNewOrder();
  };

  return (
    <section>
      <div className="add-cart">
        <h2>Your Cart ({totalItems})</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={emptyCart} alt="Empty Cart" />
            <p>Your added items will appear here</p>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <div className="item-header">
                    <p className="item-name">{item.title}</p>
                    <button
                      className="delete-btn"
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <img src={removeIcon} alt="Remove item" />
                    </button>
                  </div>
                  <p className="item-info">
                    <span className="item-quantity">{item.quantity}x</span>
                    <span className="item-price">
                      {" "}
                      @ ${item.price.toFixed(2)}
                    </span>
                    <span className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            <div className="cart-total">
              <p className="total-label">Order Total</p>
              <p className="total-price">${totalPrice.toFixed(2)}</p>
            </div>
            <button className="confirm-order-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-icon">
              <img src={orderConfirmedIcon} alt="Order Confirmed" />
            </div>
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>

            {/* Confirmed Items List */}
            <div className="confirmed-items-list">
              {confirmedItems.map((item) => (
                <div key={item.id} className="confirmed-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="confirmed-item-image"
                  />
                  <div className="confirmed-item-info">
                    <p className="confirmed-item-name">{item.title}</p>
                    <p className="confirmed-item-details">
                      <span>{item.quantity}x</span>
                      <span className="confirmed-item-price">
                        @ ${item.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <p className="confirmed-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="modal-order-total">
              <p className="modal-total-label">Order Total</p>
              <p className="modal-total-price">
                $
                {confirmedItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>

            <button className="start-new-order-btn" onClick={handleCloseModal}>
              Start New Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
