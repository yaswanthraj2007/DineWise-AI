# TableTrack – Hotel Management Frontend

React + Vite frontend for a retail hotel management system.

## Pages
- `/` – Landing page (navbar with Login and Sign up)
- `/login`, `/signup` – Authentication forms (frontend only for now)
- `/dashboard/orders` – Orders by table number
- `/dashboard/demand` – Seasonal demand products
- `/dashboard/restock` – Restock suggestions

Tables are empty on purpose. Pass data as the `rows` prop to `DataTable` once the backend is ready.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Structure
```
src/
  components/   Navbar, DashboardLayout, DataTable
  pages/        Landing, Login, Signup
  pages/dashboard/  Orders, DemandProducts, Restock
  styles/       global.css
```
