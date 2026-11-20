import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import Orders from "./pages/dashboard/Orders.jsx";
import DemandProducts from "./pages/dashboard/DemandProducts.jsx";
import Restock from "./pages/dashboard/Restock.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<Orders />} />
        <Route path="demand" element={<DemandProducts />} />
        <Route path="restock" element={<Restock />} />
        
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
