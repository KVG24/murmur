import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import convertDate from "../utils/convertDate";
import getCurrentUserId from "../utils/getCurrentUserId";

export default function Post({ postData }) {
    const navigate = useNavigate();
    const { likePost, unlikePost } = useAPI();

    const [post, setPost] = useState(postData);
    const [userId, setUserId] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setPost(postData);

        const currentUserId = getCurrentUserId();
        setUserId(currentUserId);

        if (postData?.likes && currentUserId) {
            const isLiked = postData.likes.some(
                (like) => Number(like.userId) === Number(currentUserId),
            );
            setLiked(isLiked);
        } else {
            setLiked(false);
        }
    }, [postData]);

    const handleClick = () => {
        navigate(`/posts/${post.id}`);
    };

    const handleLike = async (e, id) => {
        e.stopPropagation();

        if (liked == false) {
            setPost((prev) => ({
                ...prev,
                _count: {
                    ...prev._count,
                    likes: (prev._count?.likes ?? 0) + 1,
                },
            }));

            setLiked(true);

            // Send backend request to add like
            const result = await likePost(id);

            // If error occurs, revert state
            if (!result) {
                setPost(postData);
                setLiked(false);
            }
        } else {
            setPost((prev) => ({
                ...prev,
                _count: {
                    ...prev._count,
                    likes: (prev._count?.likes ?? 0) - 1,
                },
            }));

            setLiked(false);

            // Send backend request to remove like
            const result = await unlikePost(id);

            // If error occurs, revert state
            if (!result) {
                setPost(postData);
                setLiked(true);
            }
        }
    };

    return (
        <>
            <Container>
                <PostHeader>
                    <Username>{post.author?.username}</Username>
                    <Date>{convertDate(post.createdAt)}</Date>
                </PostHeader>
                <Content>{post.content}</Content>
                <ButtonsContainer>
                    <LikeButton
                        $liked={liked}
                        type="button"
                        onClick={(e) => {
                            handleLike(e, post.id);
                        }}
                    >
                        ❤️ {post._count?.likes ?? 0}
                    </LikeButton>
                    <CommentButton type="button" onClick={handleClick}>
                        💬 {post._count?.comments ?? 0}
                    </CommentButton>
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
`;

const CommentButton = styled.button`
    background-color: #4e4e4e;
    font-size: 1.5rem;
    border-radius: 10px;
    color: white;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #6b6b6b;
    }
`;

const LikeButton = styled.button`
    background-color: ${(props) => (props.$liked ? "#471010" : "#4e4e4e")};
    font-size: 1.5rem;
    border-radius: 10px;
    color: white;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.$liked ? "#751a1a" : "#6b6b6b")};
    }
`;
