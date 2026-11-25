import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Cart({ cart, updateCart, removeFromCart }) {
  const navigate = useNavigate();

  /* ---------------- PAYMENT STATE ---------------- */
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  /* ---------------- ORDER HISTORY (PERSISTENT) ---------------- */
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  /* SAVE ORDERS ALWAYS */
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  /* ---------------- TOTALS ---------------- */
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const discount = subtotal > 2000 ? 200 : 0;
  const total = subtotal + shipping - discount;

  /* ---------------- PAYMENT HANDLER ---------------- */
  const handlePayment = () => {
    if (
      (paymentMethod === "credit" || paymentMethod === "debit") &&
      (!cardName || !cardNumber || !expiry || !cvv)
    ) {
      alert("Please fill all card details!");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const order = {
      id: `ORDER-${Date.now()}`,
      items: cart,
      subtotal,
      discount,
      total,
      datetime: new Date().toISOString()
    };

    setOrders(prev => [order, ...prev]);

    alert(`Payment of Rs ${total} successful!`);

    cart.forEach(item => removeFromCart(item.id));

    setCardName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  const continueShopping = () => navigate("/products");

  return (
    <div className="cart-wrapper">

      {/* MINI SUMMARY */}
      <div className="mini-cart-summary">
        <h3>
          Shopping Cart ({cart.reduce((a, i) => a + i.quantity, 0)} items)
        </h3>
        <p>Subtotal: Rs {subtotal}</p>
      </div>

      <div className="cart-container">

        {/* CART SECTION */}
        <div className="cart-section">
          <h2>Your Shopping Cart</h2>

          <button className="btn-continue" onClick={continueShopping}>
            ← Continue Shopping
          </button>

          {cart.length === 0 && <p>Your cart is empty.</p>}

          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="img-wrap">
                <img src={`/images/${item.image}`} alt={item.name} />
              </div>

              <div className="item-info">
                <Link to={`/products/${item.id}`} className="item-name">
                  {item.name}
                </Link>

                <p className="price">Rs {item.price}</p>

                <div className="quantity-controls">
                  <button onClick={() => updateCart(item.id, "decrease")}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCart(item.id, "increase")}>+</button>
                </div>
              </div>

              <div className="item-subtotal">
                <p>Rs {item.price * item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAYMENT SECTION */}
        <div className="payment-section">
          <h2>Payment</h2>

          {["credit", "debit", "paypal"].map(m => (
            <label key={m}>
              <input
                type="radio"
                checked={paymentMethod === m}
                onChange={() => setPaymentMethod(m)}
              />{" "}
              {m.toUpperCase()}
            </label>
          ))}

          {paymentMethod !== "paypal" && (
            <div className="card-form">
              <input
                placeholder="Card Name"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
              />
              <input
                placeholder="Card Number"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
              />
              <div className="card-row">
                <input
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                />
                <input
                  placeholder="CVV"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                />
              </div>
            </div>
          )}

          <button className="btn-pay" onClick={handlePayment}>
            Pay Rs {total}
          </button>
        </div>

        {/* ORDER HISTORY WITH PHOTOS */}
        <div className="order-summary">
          <h3>Order History</h3>

          {orders.length === 0 && <p>No orders yet.</p>}

          {orders.map(order => {
            const d = new Date(order.datetime);
            return (
              <div key={order.id} className="order-item">
                <div>
                  <strong>{order.id}</strong><br/>
                  {d.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}<br/>
                  {d.toLocaleTimeString()}
                </div>
                <div className="order-products">
                  {order.items.map(item => (
                    <div key={item.id} className="order-product">
                      <img src={`/images/${item.image}`} alt={item.name} width={50} height={50}/>
                      <span>{item.name}</span>
                      <span>Rs {item.price} × {item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <strong>Total: Rs {order.total}</strong>
                </div>
                <hr/>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
