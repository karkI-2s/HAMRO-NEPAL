import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess({ order }) {
  if (!order) {
    return (
      <div className="main-content">
        <h2>Order not found</h2>
        <p>
          You have no recent orders.{" "}
          <Link to="/products">Start shopping</Link>
        </p>
      </div>
    );
  }

  /* ---------- SAFE DATE FIX ---------- */
  let orderDate;

  if (order.datetime) {
    orderDate = new Date(order.datetime);
  } else {
    orderDate = new Date(); // fallback
  }

  const isValidDate = !isNaN(orderDate.getTime());

  const dayName = isValidDate
    ? orderDate.toLocaleDateString("en-US", { weekday: "long" })
    : "N/A";

  const date = isValidDate
    ? orderDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const time = isValidDate
    ? orderDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "N/A";

  return (
    <div className="main-content order-success">
      <h2 className="order-title">Order Placed Successfully!</h2>

      <img
        src="/images/success.png"
        alt="Success"
        className="success-img"
      />

      <p>
        Thank you, <strong>{order.name}</strong>, for your purchase.
      </p>
      <p>
        Confirmation sent to:{" "}
        <strong>{order.email || "Not provided"}</strong>
      </p>

      <div className="order-summary">
        <h3>Order Details</h3>

        <table className="order-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    width={60}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>Rs {item.price}</td>
                <td>Rs {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="order-totals">
          <p>Subtotal: Rs {order.subtotal}</p>
          {order.discount > 0 && (
            <p><strong>Discount: Rs {order.discount}</strong></p>
          )}
          <p><strong>Total: Rs {order.total}</strong></p>

          <p>Order Date: <strong>{date}</strong></p>
          <p>Day: <strong>{dayName}</strong></p>
          <p>Time: <strong>{time}</strong></p>
        </div>
      </div>

      <div className="actions">
        <Link to="/products" className="btn-primary">
          Continue Shopping
        </Link>
        <Link to="/" className="btn-secondary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
