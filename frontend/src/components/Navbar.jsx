import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">T</span>
          TableTrack
        </Link>

        <nav className="nav-links" aria-label="Main">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#loyalty">Loyalty</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
