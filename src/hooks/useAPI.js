import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function useAPI() {
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const login = async (credentials, setError, setLoading) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);
            localStorage.setItem("jwtToken", data.token);
            navigate("/");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const signup = async (credentials, setError, setLoading) => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                // If express-validator returned an array of errors
                if (data.errors && Array.isArray(data.errors)) {
                    const errorMessages = data.errors.map((err) => err.msg);
                    setError(errorMessages);
                } else {
                    setError(data.message || "Registration failed");
                }
                setLoading(false);
                return;
            }

            navigate("/login");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const getAllPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: "GET",
            });

            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    return {
        login,
        signup,
        getAllPosts,
    };
}
