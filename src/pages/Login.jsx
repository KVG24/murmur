import styled, { keyframes } from "styled-components";

export default function Login() {
    return (
        <>
            <StyledTitle>Murmur</StyledTitle>
            <StyledTitle>Log In</StyledTitle>
            <StyledForm>
                <StyledInput
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Username"
                    required
                />
                <StyledInput
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Password"
                    required
                />
                <StyledBtn type="submit">Log In</StyledBtn>
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
