import styled from "styled-components";
import convertDate from "../utils/convertDate";

export default function Comment({ comment }) {
    return (
        <>
            <Container>
                <Header>
                    <Username>{comment.author?.username}</Username>
                    <Date>{convertDate(comment.createdAt)}</Date>
                </Header>
                <Content>{comment.content}</Content>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #333333;
    padding: 0.5rem;
    border-radius: 10px;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Username = styled.h3`
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
`;

const Content = styled.p`
    font-size: 1rem;
`;

const Date = styled.p`
    font-size: 0.7rem;
    color: #ffffffb7;
`;
