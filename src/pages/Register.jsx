import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register({ appName = "Supermarket" }) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validate form
  const validate = () => {
    if (!form.username || !form.password || !form.confirmPassword)
      return "All fields are required";

    if (form.username.length < 3)
      return "Username must be at least 3 characters";

    if (form.password.length < 6)
      return "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match";

    return "";
  };

  // Submit
  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const res = await register(
      form.username.trim(),
      form.password
    );
    setLoading(false);

    if (res.success) {
      alert(`Welcome to ${appName}! Registration successful 🎉`);
      navigate("/login");
    } else {
      setError(res.error || "Registration failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Create Account</h2>
      <p className="auth-subtitle">{appName}</p>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={submit} noValidate>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <button className="btn" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <div className="auth-links">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}
