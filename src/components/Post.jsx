import styled from "styled-components";
import convertDate from "../utils/convertDate";

export default function Post({ author, content, created }) {
    return (
        <>
            <Container>
                <PostHeader>
                    <Username>{author}</Username>
                    <Created>{convertDate(created)}</Created>
                </PostHeader>
                <Content>{content}</Content>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #333333;
    padding: 0.5rem;
    border-radius: 5px;
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 5px;
    background-color: #4e4e4e;
`;

const Username = styled.h3`
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
`;

const Content = styled.p`
    font-size: 1rem;
`;

const Created = styled.p`
    font-size: 0.7rem;
    color: #ffffffb7;
`;
