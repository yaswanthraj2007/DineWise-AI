import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const data = await api("/auth/login", { method: "POST", body: form });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
  } catch (err) {
    setError(err.message);
  }
};
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={onSubmit}>
        <Link to="/" className="brand">
          <span className="brand-mark">T</span>
          TableTrack
        </Link>
        <h1>Welcome back</h1>
        <p className="muted">Log in to manage your hotel.</p>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@hotel.com"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Enter your password"
            required
          />
        </label>

        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </div>
  );
}
