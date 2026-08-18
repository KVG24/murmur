import styled, { keyframes } from "styled-components";
import { useState } from "react";
import useAPI from "../hooks/useAPI";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAPI();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        await login({ username, password }, setError, setLoading);
    }

    return (
        <>
            <StyledTitle>Murmur</StyledTitle>
            <StyledTitle>Log In</StyledTitle>
            <StyledForm onSubmit={handleSubmit}>
                <ErrorMsg>{error}</ErrorMsg>
                <StyledInput
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <StyledInput
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <StyledBtn type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "Log In"}
                </StyledBtn>
                <SignUpText>
                    Not registered yet?{" "}
                    <SignUpLink href="/signup">Sign Up</SignUpLink>
                </SignUpText>
            </StyledForm>
        </>
    );
}

const StyledTitle = styled.h1`
    text-align: center;
`;

const StyledForm = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    border: 1px solid #592875;
    border-radius: 5px;
    padding: 1rem;
`;

const StyledInput = styled.input`
    padding: 1rem;
    font-size: 1rem;
    border-radius: 5px;
    color: white;
    background-color: #4b4b4b;

    &::placeholder {
        color: #ffffff60;
    }
`;

const StyledBtn = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: #592875;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
`;

const SignUpText = styled.p`
    margin: 0;
`;

const SignUpLink = styled.a`
    color: #b676db;
`;

const ErrorMsg = styled.p`
    color: #b82525;
    padding: 0;
    margin: 0;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
`;
