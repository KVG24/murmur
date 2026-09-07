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

            if (!response.ok) throw new Error("Failed to fetch all posts");
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    const getPost = async (postId) => {
        try {
            const response = await fetch(`${API_URL}/posts/${postId}`, {
                method: "GET",
            });

            if (!response.ok) throw new Error("Failed to fetch a post");
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    const getUserLikes = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/likes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch user likes");
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    const likePost = async (postId) => {
        try {
            const response = await fetch(`${API_URL}/posts/like/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to like post");
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    const unlikePost = async (postId) => {
        try {
            const response = await fetch(`${API_URL}/posts/like/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to unlike post");
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    const createComment = async (postId, content) => {
        try {
            const response = await fetch(
                `${API_URL}/posts/comments/${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(content),
                },
            );

            if (!response.ok) throw new Error("Failed to create comment");
            return await response.json();
        } catch (err) {
            console.log(err);
        }
    };

    return {
        login,
        signup,
        getAllPosts,
        getPost,
        getUserLikes,
        likePost,
        unlikePost,
        createComment,
    };
}
