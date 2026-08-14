import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Wall from "./pages/Wall";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/log-in" element={<LogIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/"
                        element={<Navigate to="/conversations" replace />}
                    />

                    <Route path="/conversations" element={<Conversations />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
