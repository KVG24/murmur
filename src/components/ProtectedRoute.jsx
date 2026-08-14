import { Navigate, Outlet } from "react-router-dom";
import isLoggedIn from "../utils/isLoggedIn";

export default function PublicRoute() {
    const isAuthenticated = isLoggedIn();

    if (!isAuthenticated) {
        return <Navigate to="/log-in" replace />;
    }

    return <Outlet />;
}
