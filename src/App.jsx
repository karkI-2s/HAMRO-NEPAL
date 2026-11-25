import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

/* ===== AUTH ===== */
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

/* ===== LAYOUT & PAGES ===== */
import BaseLayout from "./pages/Base";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/Product_Detail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderSuccess from "./pages/Order_Success";
import ContactPage from "./pages/Contact";
import LocationPage from "./pages/Location";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import ScrollFix from "./ScrollFix";
import "./style.css";

function AppWrapper() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* ===== PRODUCTS LIST ===== */
    const products = [
  { id: 1, name: "artichoke-globe", category: "Vegetables", price: 120, image: "artichoke-globe__FitMaxWzYxNSw2MTVd.jpg" },
  { id: 2, name: "asian-greens", category: "Vegetables", price: 60, image: "asian-greens.jpg" },
  { id: 3, name: "asparagus", category: "Vegetables", price: 200, image: "asparagus.jpg" },
  { id: 4, name: "beans", category: "Vegetables", price: 80, image: "beans.jpg" },
  { id: 5, name: "beetroot", category: "Vegetables", price: 90, image: "beetroot.jpg" },
  { id: 6, name: "broccoli", category: "Vegetables", price: 150, image: "broccoli.jpg" },
  { id: 7, name: "brussels-sprouts", category: "Vegetables", price: 180, image: "brussels-sprouts.jpg" },
  { id: 8, name: "cabbages", category: "Vegetables", price: 120, image: "cabbages.jpg" },
  { id: 9, name: "capsicums", category: "Vegetables", price: 60, image: "capsicums.jpg" },
  { id: 10, name: "cauliflower", category: "Vegetables", price: 200, image: "cauliflower.jpg" },
  { id: 11, name: "Carrots", category: "Vegetables", price: 80, image: "carrots.jpg" },
  { id: 12, name: "celeriac", category: "Vegetables", price: 90, image: "celeriac.jpg" },
  { id: 13, name: "celery", category: "Vegetables", price: 50, image: "celery.jpg" },
  { id: 14, name: "chilli-peppers", category: "Vegetables", price: 880, image: "chilli-peppers.jpg" },
  { id: 15, name: "courgettee", category: "Vegetables", price: 520, image: "courgette.jpg" },
  { id: 16, name: "cucumber", category: "Vegetables", price: 80, image: "cucumber.jpg" },
  { id: 17, name: "eggplant", category: "Vegetables", price: 500, image: "eggplant.jpg" },
  { id: 18, name: "fennel", category: "Vegetables", price: 80, image: "fennel.jpg" },
  { id: 19, name: "garlic", category: "Vegetables", price: 90, image: "garlic.jpg" },
  { id: 20, name: "ginger", category: "Vegetables", price: 180, image: "ginger.jpg" },
  { id: 21, name: "herbs", category: "Vegetables", price: 190, image: "herbs.jpg" },
  { id: 22, name: "indian-vegetables", category: "Vegetables", price: 220, image: "indian-vegetables.jpg" },
  { id: 23, name: "Kale", category: "Vegetables", price: 50, image: "Kale.jpg" },
  { id: 24, name: "Kohlrabi", category: "Vegetables", price: 100, image: "Kohlrabi.jpg" },
  { id: 25, name: "kumara", category: "Vegetables", price: 80, image: "kumara.jpg" },
  { id: 26, name: "leeks", category: "Vegetables", price: 90, image: "leeks.jpg" },
  { id: 27, name: "lettuce", category: "Vegetables", price: 150, image: "lettuce.jpg" },
  { id: 28, name: "microgreens", category: "Vegetables", price: 180, image: "microgreens.jpg" },
  { id: 29, name: "mushrooms", category: "Vegetables", price: 60, image: "mushrooms.jpg" },
  { id: 30, name: "okra", category: "Vegetables", price: 200, image: "okra.jpg" },
  { id: 31, name: "onions", category: "Vegetables", price: 80, image: "onions.jpg" },
  { id: 32, name: "parsnip", category: "Vegetables", price: 90, image: "parsnip.jpg" },
  { id: 33, name: "pease", category: "Vegetables", price: 150, image: "peas.jpg" },
  { id: 34, name: "Potatoes", category: "Vegetables", price: 180, image: "Potatoes.jpg" },
  { id: 35, name: "puha", category: "Vegetables", price: 120, image: "puha.png" },
  { id: 36, name: "pumpkins", category: "Vegetables", price: 60, image: "pumpkins.jpg" },
  { id: 37, name: "radish", category: "Vegetables", price: 200, image: "radish.jpg" },
  { id: 38, name: "rhubarb", category: "Vegetables", price: 80, image: "rhubarb.jpg" },
  { id: 39, name: "salad-greens", category: "Vegetables", price: 90, image: "salad-greens.jpg" },
  { id: 40, name: "silverbeet", category: "Vegetables", price: 150, image: "silverbeet.jpg" },
  { id: 41, name: "spinach", category: "Vegetables", price: 120, image: "spinach.jpg" },
  { id: 42, name: "springonion", category: "Vegetables", price: 60, image: "springonion.jpg" },
  { id: 43, name: "sproutsd", category: "Vegetables", price: 200, image: "sproutsd.jpg" },
  { id: 44, name: "swede", category: "Vegetables", price: 80, image: "swede.jpg" },
  { id: 45, name: "sweet-corn", category: "Vegetables", price: 90, image: "sweet-corn.jpg" },
  { id: 46, name: "taro", category: "Vegetables", price: 150, image: "taro.jpg" },
  { id: 47, name: "tomato", category: "Vegetables", price: 180, image: "tomato.jpg" },
  { id: 48, name: "Turmeric", category: "Vegetables", price: 120, image: "Turmeric.jpg" },
  { id: 49, name: "turnip", category: "Vegetables", price: 60, image: "turnip.jpg" },
  { id: 50, name: "vivek-sharma", category: "Vegetables", price: 200, image: "vivek-sharma.jpg" },
  { id: 51, name: "watercress", category: "Vegetables", price: 80, image: "watercress.jpg" },
  { id: 52, name: "witloof", category: "Vegetables", price: 90, image: "witloof.jpg" },
  { id: 53, name: "yams", category: "Vegetables", price: 350, image: "yams.jpg" },
  { id: 54, name: "chaumin", category: "noodles", price: 100, image: "images (9).jpg" },
  { id: 55, name: "current chauchau", category: "noodles", price: 80, image: "images (6).jpg" },
  { id: 56, name: "2pm", category: "noodles", price: 90, image: "images (10).jpg" },
  { id: 57, name: "rara", category: "noodles", price: 150, image: "RaRa.jpg" },
  { id: 58, name: "WaiWai", category: "noodles", price: 180, image: "Waiwai.jpg" },
  { id: 59, name: "Maggi", category: "noodles", price: 60, image: "Maggi.jpg" },
  { id: 60, name: "pritti", category: "noodles", price: 200, image: "pritti.jpg" },
  { id: 61, name: "pasta", category: "noodles", price: 80, image: "pasta.jpg" },
  { id: 62, name: "goodday", category: "biscuit", price: 50, image: "goodday.jpg" }, 
  { id: 63, name: "Digestives", category: "biscuit", price: 60, image: "Digestives.jpg" },
  { id: 64, name: "Parle-G", category: "biscuit", price: 75, image: "Parle-G.jpg" },
  { id: 65, name: "Oreo", category: "biscuit", price: 55, image: "Oreo.jpg" },
  { id: 66, name: "Eyeliner", category: "makeup", price: 1000, image: "Eyeliner.webp" },
  { id: 67, name: "Face Powder",category:"makeup", price: 1300, image: "Face Powder.webp" },
  { id: 68, name: "eye product",category:"makeup", price: 2500, image: "eye product.webp" },
  { id: 69, name: "eye shadow",category: "makeup", price: 560, image: "eye shadow.webp" },
  { id: 70, name: "Foundation",category:"makeup", price: 2000, image: "Foundation.webp" },
  { id: 71, name: "Lipstick.",category: "makeup", price: 1500, image: "Lipstick.webp" },
  { id: 72, name: "Dairy milk", category: "chocolate", price: 250, image:"Dairy milk.jpg" },
  { id: 73, name: "kitkat", category: "chocolate", price: 160, image: "kitkat.jpg" },
  { id: 74, name: "Snickers", category: "chocolate", price: 100, image: "Snickers.png" },
  { id: 75, name: "Rocher", category: "chocolate", price: 1500, image: "Rocher.jpg" },
  { id: 76, name: "apple juice", category: "juice", price: 140, image: "apple juice.webp" },
  { id: 77, name: "Real juice", category: "juice", price:555, image: "Real juice.jpg" },
  { id: 78, name: "orang", category: "juice", price: 180, image: "orange.jpg" },
  { id: 79, name: "mango.jpg", category: "juice", price: 200, image:  "mango.jpg" },
  { id: 80, name: "Shashile", category: "Meats", price: 1200, image: "shashlile.png" },
  { id: 81, name: "Meathalls", category: "Meats", price: 1000, image: "meathalls.png" },
  { id: 82, name: "Beef Steak", category: "Meats", price: 800, image: "beef steak.png" },
  { id: 83, name: "Lamb Chogs", category: "Meats", price: 1100, image: "lamb chogs.png" },
  { id: 84, name: "Roasted Chichen", category: "Meats", price: 1500, image: "roasted chichen.png" },
  { id: 85, name: "Lasagna", category: "Meats", price: 1000, image: "lasagna.png" },
  { id: 86, name: "Beef Stroganaff", category: "Meats", price: 700, image: "beef stroganoff.png" },
  { id: 87, name: "Fish", category: "Meats", price: 1000, image: "fish.png" },
  { id: 88, name: "Chicken", category: "Meats", price: 1800, image: "chicken.png" },
  { id: 89, name: "Niku Jirou", category: "Meats", price: 1900, image: "niku jirou.png" },
  { id: 90, name: "Sausage", category: "Meats", price: 500, image: "sausage.png" },
  { id: 91, name: "Dry Meat", category: "Meats", price: 1800, image: "dry meat.png" },
  { id: 92, name: "black pen", category: "pen", price: "230", image: "black pen.jpg" },
  { id: 93, name: "blue pen", category: "pen", price: "300", image: "blue pen.jpg" },
  { id: 94, name: "green pen", category: "pen", price: "220", image: "green pen.jpg" },
  { id: 95, name: "red pen", category: "pen", price: "130", image: "red pen.jpg" },
  { id: 96, name: "pink pen", category: "pen", price: "125", image: "pink pen.jpg" },
  { id: 97, name: "yellow", category: "pen", price: "120", image: "yellow.jpg" },
  { id: 98, name: "red marker", category: "marker", price: "250", image: "red marker.png" },
  { id: 99, name: "blue marker", category: "marker", price: "320", image: "blue marker.jpg" },
  { id: 100, name: "green marker", category: "marker", price: "320", image: "green marker.webp" },
  { id: 101, name: "strawberry", category: "fruits", price: "600", image: "strawberry.webp" },
  { id: 102, name: "apple", category: "fruits", price: "750", image: "apple.jpg" },
  { id: 103, name: "avocado", category: "fruits", price: "1020", image: "avocado.webp" },
  { id: 104, name: "banana", category: "fruits", price: "990", image: "banana.jpg" },
  { id: 105, name: "blueberry", category: "fruits", price: "800", image: "blueberry.webp" },
  { id: 106, name: "cherry", category: "fruits", price: "780", image: "cherry.jpg" },
  { id: 107, name: "dragon fruit", category: "fruits", price: "560", image: "dragon fruit.jpg" },
  { id: 108, name: "gauva", category: "fruits", price: "850", image: "gauva.jpg" },
  { id: 109, name: "grapes", category: "fruits", price: "700", image: "grapes.jpg" },
  { id: 110, name: "graves", category: "fruits", price: "590", image: "graves.jpg" },
  { id: 111, name: "kiwi", category: "fruits", price: "460", image: "kiwi.webp" },
  { id: 112, name: "lychees", category: "fruits", price: "480", image: "lychees.webp" },
  { id: 113, name: "mango", category: "fruits", price: "570", image: "mango.jpg" },
  { id: 114, name: "star-fruit", category: "fruits", price: "420", image: "ms-star-fruit.jpg" },
  { id: 115, name: "orange", category: "fruits", price: "370", image: "orange f.jpg" },
  { id: 116, name: "papaya", category: "fruits", price: "360", image: "papaya..webp" },
  { id: 117, name: "peach", category: "fruits", price: "650", image: "peach.jpg" },
  { id: 118, name: "pear", category: "fruits", price: "600", image: "pear.jpeg" },
  { id: 119, name: "pineapples", category: "fruits", price: "500", image: "pineapples.jpg" },
  { id: 120, name: "plum", category: "fruits", price: "550", image: "plum.webp" },
  { id: 121, name: "pomegranate", category: "fruits", price: "500", image: "pomegranate.jpg" },
  { id: 123, name: "watermalon", category: "fruits", price: "450", image: "watermalon.jpg" },
  ];

  const allCategories = [...new Set(products.map(p => p.category))];

  /* ===== CART FUNCTIONS ===== */
  const addToCart = (id, qty = 1, redirect = true) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    setCart(prev => {
      const exists = prev.find(i => i.id === id);
      if (exists) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { ...product, quantity: qty }];
    });

    if (redirect) navigate("/cart");
  };

  const updateCart = (id, type) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const q = type === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, q) };
      }
      return item;
    }));
  };

  const removeFromCart = id => setCart(prev => prev.filter(i => i.id !== id));

  const placeOrder = (formData) => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = [0, 6].includes(new Date().getDay()) ? subtotal * 0.1 : 0;
    const total = subtotal - discount;

    const orderData = { customer: formData, user, items: cart, subtotal, discount, total, createdAt: new Date().toLocaleString() };
    setOrder(orderData);
    setCart([]);
    localStorage.removeItem("cart");
    navigate("/order-success");
  };

  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage products={products} allCategories={allCategories} addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetail products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} updateCart={updateCart} removeFromCart={removeFromCart} />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* PROTECTED CHECKOUT */}
        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage cart={cart} placeOrder={placeOrder} /></ProtectedRoute>} />
        <Route path="/order-success" element={<OrderSuccess order={order} />} />

        <Route path="/contact" element={<ContactPage />} />
        <Route path="/location" element={<LocationPage />} />
      </Routes>
    </BaseLayout>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollFix />
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}
