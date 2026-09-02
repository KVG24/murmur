import { jwtDecode } from "jwt-decode";

export default function getCurrentUserId() {
    const token = localStorage.getItem("jwtToken");

    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.sub;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
