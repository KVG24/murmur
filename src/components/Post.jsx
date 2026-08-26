import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import convertDate from "../utils/convertDate";

export default function Post({
    author,
    content,
    createdAt,
    likes,
    comments,
    postId,
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/posts/${postId}`);
    };

    const handleLike = (e) => {
        e.stopPropagation();
        // Create like logic in useAPI and add it here
    };

    return (
        <>
            <Container>
                <PostHeader>
                    <Username>{author}</Username>
                    <Created>{convertDate(createdAt)}</Created>
                </PostHeader>
                <Content onClick={handleClick}>{content}</Content>
                <ButtonsContainer>
                    <button type="button">❤️ {likes}</button>
                    <button type="button" onClick={handleClick}>
                        💬 {comments}
                    </button>
                </ButtonsContainer>
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

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 10px;
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

const ButtonsContainer = styled.div`
    border-radius: 10px;
    width: max-content;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;

    & button {
        background-color: #4e4e4e;
        font-size: 1.5rem;
        border-radius: 10px;
        color: white;
        transition: 0.2s;

        &:hover {
            background-color: #6b6b6b;
        }
    }
`;
