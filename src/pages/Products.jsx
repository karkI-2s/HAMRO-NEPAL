import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProductsPage({ products, allCategories, addToCart }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantities, setQuantities] = useState({});

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleQtyChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(parseInt(value) || 1, 1),
    }));
  };

  const handleAddToCart = (productId, qty) => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(productId, qty);
  };

  return (
    <div className="main-content">
      <h2>Products</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* CATEGORY */}
      <div className="category-box">
        <button onClick={() => setSelectedCategory("")}>All</button>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="product-grid">
        {filteredProducts.map(p => (
          <div key={p.id} className="product-card">
            <Link to={`/products/${p.id}`}>
              <img src={`/images/${p.image}`} alt={p.name} />
              <h3>{p.name}</h3>
            </Link>

            <p>Rs {p.price}</p>

            <input
              type="number"
              min="1"
              value={quantities[p.id] || 1}
              onChange={e => handleQtyChange(p.id, e.target.value)}
            />

            <button
              onClick={() =>
                handleAddToCart(p.id, quantities[p.id] || 1)
              }
            >
              {user ? "Add to Cart" : "Login to Buy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
