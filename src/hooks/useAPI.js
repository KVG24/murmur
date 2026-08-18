import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function useAPI() {
    const token = localStorage.getItem("jwtToken");
    const navigate = useNavigate();

    const logIn = async (credentials, setError, setLoading) => {
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

    const signUp = async (credentials, setError, setLoading) => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message);

            navigate("/log-in");
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return {
        logIn,
        signUp,
    };
}
