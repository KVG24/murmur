import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import convertDate from "../utils/convertDate";
import getCurrentUserId from "../utils/getCurrentUserId";
import useAPI from "../hooks/useAPI";

import Comment from "../components/Comment";

export default function PostPage() {
    const { postId } = useParams();
    const { getPost, likePost, unlikePost, createComment } = useAPI();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [userId, setUserId] = useState(null);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        setLoading(true);
        getPost(postId)
            .then((data) => {
                setPost(data);

                const currentUserId = getCurrentUserId();
                setUserId(currentUserId);

                if (data?.likes && currentUserId) {
                    const isLiked = data.likes.some(
                        (like) => Number(like.userId) === Number(currentUserId),
                    );
                    setLiked(isLiked);
                } else {
                    setLiked(false);
                }
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
                getPost(postId).then(setPost);
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
                getPost(postId).then(setPost);
            }
        }
    };

    const handleCreateComment = async (e, content) => {
        e.preventDefault();
        try {
            if (!commentText) return null;
            await createComment(postId, { content: commentText });
            setCommentText("");
        } catch (err) {
            console.error("Failed to send a new comment", err);
        }
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
                        <LikeButton
                            $liked={liked}
                            type="button"
                            onClick={(e) => {
                                handleLike(e, post.id);
                            }}
                        >
                            ❤️ {post._count?.likes ?? 0}
                        </LikeButton>
                        <CommentButton type="button">
                            💬 {post._count?.comments ?? 0}
                        </CommentButton>
                    </ButtonsContainer>
                    <CommentForm onSubmit={handleCreateComment}>
                        <CommentInput
                            type="text"
                            placeholder="Your thoughts?"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <SubmitCommentButton type="submit">
                            Post
                        </SubmitCommentButton>
                    </CommentForm>
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

const CommentForm = styled.form`
    border-top: 3px solid #707070;
    padding-top: 0.7rem;
    display: flex;
    gap: 10px;
`;

const CommentInput = styled.input`
    width: 100%;
    background-color: #a09f9f;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;

    &::placeholder {
        color: #00000099;
    }
`;

const SubmitCommentButton = styled.button`
    background-color: #4e4e4e;
    padding: 0.5rem;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    transition: 0.2s;

    &:hover {
        background-color: #636363;
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
