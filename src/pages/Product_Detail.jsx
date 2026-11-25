import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // added useNavigate

export default function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);

  const navigate = useNavigate(); // hook for redirect

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setComments(savedComments);
  }, [id]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, quantity);
  };

  // Buy Now handler
  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product.id, quantity); // add to cart
    navigate("/checkout"); // redirect to checkout page
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!name || !commentText) return alert("Enter name and comment!");
    const newComment = {
      id: Date.now(),
      name,
      text: commentText,
      rating,
      date: new Date().toLocaleString(),
    };
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setName("");
    setCommentText("");
    setRating(5);
  };

  if (!product) return <p style={{ textAlign: "center", marginTop: "50px", color: "red", fontSize: "20px" }}>Product not found!</p>;

  return (
    <div className="product-detail-container">

      {/* CSS */}
      <style>{`
        .product-detail-container {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
          font-family: Poppins, sans-serif;
        }
        .product-layout {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (min-width: 1024px) {
          .product-layout {
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .left-col, .center-col, .right-col {
            flex: 1 1 0;
            max-width: 33.33%;
            box-sizing: border-box;
          }
        }
        @media (max-width: 1023px) {
          .left-col, .center-col, .right-col {
            width: 100%;
            box-sizing: border-box;
          }
        }
        .column-box {
          background: #fff;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.05);
        }
        .left-col img {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
          transition: transform 0.3s ease;
        }
        .left-col img:hover {
          transform: scale(1.02);
        }
        .buy-button {
          width: 100%;
          padding: 12px;
          margin-bottom: 10px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .add-cart { background: #facc15; color: #000; }
        .add-cart:hover { background: #eab308; }
        .buy-now { background: #f97316; color: #fff; }
        .buy-now:hover { background: #ea580c; }
        .review-box { margin-top: 30px; }
        .review-card {
          background: #f9fafb;
          padding: 14px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          margin-bottom: 10px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.05);
        }
        .review-card .rating {
          color: #fbbf24;
          font-size: 16px;
        }
        a.back-link {
          display: block;
          margin-top: 20px;
          color: #3b82f6;
          text-decoration: none;
        }
        a.back-link:hover {
          text-decoration: underline;
        }
        .product-details {
          margin-top: 20px;
          border-top: 1px solid #e5e7eb;
          padding-top: 15px;
        }
        .product-details li {
          list-style: none;
          margin-bottom: 6px;
          font-size: 14px;
          color: #374151;
        }
        .product-details li strong {
          width: 110px;
          display: inline-block;
        }
      `}</style>

      {/* MAIN PRODUCT LAYOUT */}
      <div className="product-layout">

        {/* LEFT = IMAGE */}
        <div className="left-col column-box">
          <img src={`/images/${product.image}`} alt={product.name} />
        </div>

        {/* CENTER = INFO */}
        <div className="center-col column-box">
          <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "10px" }}>{product.name}</h1>
          <div style={{ color: "#facc15", marginBottom: "10px" }}>
            {"★".repeat(5)}
            <span style={{ color: "#6b7280", fontSize: "14px", marginLeft: "6px" }}>(Top rated product)</span>
          </div>
          <p style={{ color: "#374151", fontSize: "16px", lineHeight: "1.5" }}>
            {product.description || "Premium product available exclusively at Nepal Super Market."}
          </p>
          <p style={{ marginTop: "10px", color: "#374151" }}>
            <strong>Category:</strong> {product.category}
          </p>
        </div>

        {/* RIGHT = BUY BOX */}
        <div className="right-col column-box">
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a", marginBottom: "10px" }}>Rs {product.price}</p>
          <label style={{ fontWeight: "bold" }}>Quantity:</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{ display: "block", margin: "10px 0 20px 0", padding: "8px", borderRadius: "8px", border: "1px solid #d1d5db" }}
          >
            {[1,2,3,4,5,10].map(q => <option key={q}>{q}</option>)}
          </select>
          <button onClick={handleAddToCart} className="buy-button add-cart">Add to Cart</button>
          <button onClick={handleBuyNow} className="buy-button buy-now">Buy Now</button> {/* updated */}
          <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "10px" }}>Fast Delivery by Nepal Super Market</p>

          {/* PRODUCT DETAILS */}
          <ul className="product-details">
            <li><strong>Brand:</strong> {product.brand || "Nepal Super Market"}</li>
            <li><strong>Model:</strong> {product.model || "Standard"}</li>
            <li><strong>Weight:</strong> {product.weight || "500g"}</li>
            <li><strong>Dimensions:</strong> {product.dimensions || "20 × 15 × 10 cm"}</li>
            <li><strong>Material:</strong> {product.material || "Premium Grade"}</li>
            <li><strong>Origin:</strong> {product.origin || "Nepal / Japan Import"}</li>
            <li><strong>Shelf Life:</strong> {product.shelfLife || "12 Months"}</li>
          </ul>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="review-box">
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>Customer Reviews</h2>
        <form onSubmit={handleSubmitComment} style={{ marginBottom: "15px" }}>
          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #d1d5db", marginBottom: "10px" }} />
          <textarea placeholder="Write your review..." value={commentText} onChange={(e) => setCommentText(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #d1d5db", minHeight: "100px", marginBottom: "10px" }} />
          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} style={{ padding: "8px", borderRadius: "8px", border: "1px solid #d1d5db", marginBottom: "10px" }}>
            {[5,4,3,2,1].map(r => <option key={r}>{r}</option>)}
          </select>
          <button type="submit" style={{ padding: "10px 20px", background: "#2563eb", color: "#fff", fontWeight: "bold", borderRadius: "12px", cursor: "pointer" }}>Submit Review</button>
        </form>

        {comments.length === 0 && <p style={{ color: "#6b7280" }}>No reviews yet.</p>}
        {comments.map(c => (
          <div key={c.id} className="review-card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong>{c.name}</strong>
              <span style={{ color: "#6b7280", fontSize: "12px" }}>{c.date}</span>
            </div>
            <div className="rating">{"★".repeat(c.rating)}<span style={{ color: "#d1d5db"}}>{"★".repeat(5 - c.rating)}</span></div>
            <p style={{ marginTop: "5px", color: "#374151" }}>{c.text}</p>
          </div>
        ))}
      </div>

      <Link to="/products" className="back-link">← Back to Products</Link>
    </div>
  );
}
