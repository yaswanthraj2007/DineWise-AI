import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";

const menu = [
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/demand", label: "Demand Products" },
  { to: "/dashboard/restock", label: "Restock" },
];

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dash">
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <Link to="/" className="brand sidebar-brand">
          <span className="brand-mark">T</span>
          TableTrack
        </Link>

        <p className="sidebar-label">Menu</p>
        <nav className="sidebar-nav" onClick={() => setOpen(false)}>
          {menu.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link
            to="/login"
            className="sidebar-link"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            Log out
          </Link>
        </div>
      </aside>

      <div className="dash-main">
        <header className="topbar">
          <button
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            Menu
          </button>
          <span className="topbar-title">Hotel Dashboard</span>
        </header>

        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
