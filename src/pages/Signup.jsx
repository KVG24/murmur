import styled, { keyframes } from "styled-components";

export default function SignUp() {
    return (
        <>
            <StyledTitle>Murmur</StyledTitle>
            <StyledTitle>Sign Up</StyledTitle>
            <StyledForm>
                <StyledInput
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                />
                <StyledInput
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Password"
                    required
                />
                <StyledInput
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Name"
                    required
                />
                <StyledInput
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Username"
                    required
                />

                <StyledBtn type="submit">Sign Up</StyledBtn>
                <LogInText>
                    Existing user? <LogInLink href="/log-in">Log In</LogInLink>
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
