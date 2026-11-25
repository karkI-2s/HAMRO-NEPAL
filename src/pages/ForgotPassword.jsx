import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword({ appName = "Supermarket" }) {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    if (!form.username || !form.newPassword || !form.confirmPassword)
      return "All fields are required";

    if (form.newPassword.length < 6)
      return "Password must be at least 6 characters";

    if (form.newPassword !== form.confirmPassword)
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
    const res = await resetPassword(
      form.username.trim(),
      form.newPassword
    );
    setLoading(false);

    if (res.success) {
      alert(`${appName}: Password reset successful ✅`);
      navigate("/login");
    } else {
      setError(res.error || "User not found");
    }
  };

  return (
    <div className="auth-box">
      <h2>Reset Password</h2>
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
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
        />

        <button className="btn" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="auth-links">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
}
