import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage({ cart, placeOrder }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const orderData = placeOrder(formData); // ✅ now returns order

    navigate("/order-success", {
      state: { order: orderData }
    });
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="main-content">
        <h2>Checkout</h2>
        <p>
          Your cart is empty.{" "}
          <a href="/products" className="text-red-600">
            Buy products
          </a>
        </p>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount =
    [0, 6].includes(new Date().getDay()) ? subtotal * 0.1 : 0;

  const total = subtotal - discount;

  return (
    <div className="main-content">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="order-summary mb-4 border p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>

        <ul className="mb-2">
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} — {item.quantity} × Rs {item.price} = Rs{" "}
              {item.quantity * item.price}
            </li>
          ))}
        </ul>

        <p>Subtotal: Rs {subtotal}</p>
        {discount > 0 && (
          <p>
            <strong>Weekend Discount: Rs {discount}</strong>
          </p>
        )}
        <p>
          <strong>Total: Rs {total}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Shipping address"
          value={formData.address}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
