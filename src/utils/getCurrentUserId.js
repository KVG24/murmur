import { jwtDecode } from "jwt-decode";

export function getCurrentUserId() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.id;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
