
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "../Pages/Register/RegisterPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="*"
        element={<Navigate to="/register" replace />}
      />
    </Routes>
  );
}
