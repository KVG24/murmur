import styled, { keyframes } from "styled-components";
import { useState } from "react";
import useAPI from "../hooks/useAPI";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup } = useAPI();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        await signup({ email, password, username }, setError, setLoading);
    }

    return (
        <>
            <StyledTitle>Murmur</StyledTitle>
            <StyledTitle>Sign Up</StyledTitle>
            <StyledForm onSubmit={handleSubmit}>
                {Array.isArray(error) ? (
                    <ul>
                        {error.map((errText, index) => (
                            <ErrorMsg key={index}>{errText}</ErrorMsg>
                        ))}
                    </ul>
                ) : (
                    <ul>
                        <ErrorMsg>{error}</ErrorMsg>
                    </ul>
                )}
                <StyledInput
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
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
                <StyledInput
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <StyledBtn type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "Sign Up"}
                </StyledBtn>
                <LogInText>
                    Existing user? <LogInLink href="/login">Log In</LogInLink>
                </LogInText>
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

const LogInText = styled.p`
    margin: 0;
`;

const LogInLink = styled.a`
    color: #b676db;
`;

const ErrorMsg = styled.li`
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
