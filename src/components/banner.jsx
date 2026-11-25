import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

const banners = [
  {
    image: "/images/original-6c153560111fff3d4d21a247ed7f03b3.jpg",
  },
  {
    image: "/images/original-1cbe1e1ef6530599f11700c97bb31efa.jpg",
  },
  {
    image: "/images/original-8d621a5a45a2f88f2e4cbcd02bd3e30c.webp",
  }
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchX = useRef(0);
  const navigate = useNavigate();

  // Auto slide
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const next = () => setIndex((index + 1) % banners.length);
  const prev = () =>
    setIndex((index - 1 + banners.length) % banners.length);

  // Touch swipe
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (diff > 60) next();
    if (diff < -60) prev();
  };

  // Banner click → products
  const goToProducts = () => {
    navigate("/products");
  };

  return (
    <section
      className="banner"
      onClick={goToProducts}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ cursor: "pointer" }}
    >
      {/* Background image */}
      <div
        className="banner-bg"
        style={{ backgroundImage: `url(${banners[index].image})` }}
      />

      {/* Arrows */}
      <button
        className="arrow left"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        ‹
      </button>

      <button
        className="arrow right"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        ›
      </button>

      {/* Dots */}
      <div className="dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setIndex(i);
            }}
          />
        ))}
      </div>
    </section>
  );
}
