
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "../Pages/Register/RegisterPage";
import LoginPage from "../Pages/Login/LoginPage";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";


function GalleryPlaceholder() {
    return (
        <main className="min-h-dvh bg-[#09090f] p-8 text-white">
            <h1 className="text-2xl font-semibold">
                Image Gallery
            </h1>
            <p className="mt-2 text-slate-400">
                You are authenticated.
            </p>
        </main>
    );
}

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public routes: logged-out users */}
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Private routes: authenticated users */}
            <Route element={<PrivateRoute />}>
                <Route
                    path="/gallery"
                    element={<GalleryPlaceholder />}
                />
            </Route>

            {/* Default route */}
            <Route
                path="/"
                element={<Navigate to="/gallery" replace />}
            />

            {/* Unknown routes */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}
