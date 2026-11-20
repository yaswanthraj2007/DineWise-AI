import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const features = [
  {
    title: "Table-wise order monitoring",
    text: "Track every order against its table number so the kitchen and floor staff always know what is pending, served or billed.",
  },
  {
    title: "Seasonal demand insights",
    text: "See which food items are in demand this season and plan your menu and preparation around what guests actually order.",
  },
  {
    title: "Smart restock suggestions",
    text: "Get recommended quantities and priorities for each item, based on current stock levels and seasonal demand.",
  },
  {
    title: "Regular customer discounts",
    text: "Reward returning guests automatically with loyalty discounts applied at billing.",
  },
];

const steps = [
  {
    title: "Capture orders",
    text: "Staff log orders by table number from any device.",
  },
  {
    title: "Analyse demand",
    text: "The system studies what sells most in the current season.",
  },
  {
    title: "Restock smartly",
    text: "Receive clear suggestions on what to buy and how much.",
  },
  {
    title: "Reward loyalty",
    text: "Regular customers get discounts without manual effort.",
  },
];

export default function Landing() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <span className="pill">Retail hotel management</span>
            <h1>Run your hotel kitchen with clarity, not guesswork.</h1>
            <p className="hero-text">
              TableTrack helps you monitor orders by table, understand seasonal
              food demand, restock at the right time, and reward your regular
              customers.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get started
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Login
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <div className="section-head">
              <h2>Everything you need to manage service and stock</h2>
              <p>
                Four focused tools that work together, from the table to the
                storeroom.
              </p>
            </div>
            <div className="grid grid-4">
              {features.map((f) => (
                <article key={f.title} className="card">
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section section-alt">
          <div className="container">
            <div className="section-head">
              <h2>How it works</h2>
              <p>A simple flow that keeps your operations connected.</p>
            </div>
            <div className="grid grid-4">
              {steps.map((s, i) => (
                <div key={s.title} className="step">
                  <span className="step-no">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="loyalty" className="section">
          <div className="container split">
            <div>
              <h2>Reward the guests who keep coming back</h2>
              <p className="muted-lg">
                Regular customers are the backbone of any hotel. TableTrack
                recognises returning guests and applies discounts so loyalty is
                rewarded consistently.
              </p>
            </div>
            <ul className="check-list">
              <li>Automatic recognition of repeat customers</li>
              <li>Discounts applied at billing</li>
              <li>Consistent rewards across every table</li>
            </ul>
          </div>
        </section>

        <section className="cta">
          <div className="container cta-inner">
            <h2>Ready to simplify your hotel operations?</h2>
            <Link to="/signup" className="btn btn-light btn-lg">
              Create your account
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>&copy; {new Date().getFullYear()} TableTrack</span>
          <span>Retail hotel management</span>
        </div>
      </footer>
    </>
  );
}
