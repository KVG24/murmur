import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import convertDate from "../utils/convertDate";
import useAPI from "../hooks/useAPI";

import Comment from "../components/Comment";

export default function PostPage() {
    const { postId } = useParams();
    const { getPost, likePost } = useAPI();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPost(postId)
            .then((data) => {
                setPost(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [postId]);

    const handleClickBack = () => {
        navigate(`/wall`);
    };

    const handleLike = async (e, id) => {
        e.stopPropagation();

        // Increment local state
        setPost((prev) => ({
            ...prev,
            _count: {
                ...prev._count,
                likes: (prev._count?.likes ?? 0) + 1,
            },
        }));

        // Send backend request
        const result = await likePost(id);

        // If error occurs, revert state
        if (!result) {
            getPost(postId).then(setPost);
        }

        // To do: add ability to "delete" like from db and update local state on second click
    };

    if (loading) {
        return <Container>Loading post...</Container>;
    }

    if (!post) {
        return <Container>Post not found.</Container>;
    }

    return (
        <>
            <BackButton onClick={handleClickBack}>⬅️</BackButton>
            <Container>
                <PostContainer>
                    <PostHeader>
                        <Username>
                            {post.author?.username || "Anonymous"}
                        </Username>
                        <Date>
                            {convertDate(post.created || post.createdAt)}
                        </Date>
                    </PostHeader>
                    <Content>{post.content}</Content>
                    <ButtonsContainer>
                        <button
                            type="button"
                            onClick={(e) => {
                                handleLike(e, post.id);
                            }}
                        >
                            ❤️ {post._count?.likes ?? 0}
                        </button>
                        <button type="button">
                            💬 {post._count?.comments ?? 0}
                        </button>
                    </ButtonsContainer>
                    <CommentsContainer>
                        {post.comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </CommentsContainer>
                </PostContainer>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const PostContainer = styled.div`
    width: 800px;
    display: flex;
    gap: 0.5rem;
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

const Date = styled.p`
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
        cursor: pointer;

        &:hover {
            background-color: #6b6b6b;
        }
    }
`;

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    border-top: 3px solid #707070;
`;

const BackButton = styled.div`
    font-size: 2rem;
    position: absolute;
    left: 2rem;
    top: 1rem;
    cursor: pointer;
`;
