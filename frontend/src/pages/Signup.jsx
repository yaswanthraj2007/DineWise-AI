import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api.js";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    hotel: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try {
    const data = await api("/auth/signup", { method: "POST", body: form });
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
        <h1>Create your account</h1>
        <p className="muted">Set up your hotel in a few minutes.</p>

        <label>
          Hotel / Restaurant name
          <input
            name="hotel"
            value={form.hotel}
            onChange={onChange}
            placeholder="Your hotel name"
            required
          />
        </label>
        <label>
          Your name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full name"
            required
          />
        </label>
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
            placeholder="Minimum 8 characters"
            minLength={8}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary btn-block">
          Sign up
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
