import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import { useState, useEffect } from "react";

export default function Wall() {
    const [posts, setPosts] = useState([]);
    const { getAllPosts } = useAPI();

    useEffect(() => {
        getAllPosts().then((data) => {
            setPosts(data);
        });
    }, []);

    return (
        <>
            <Container>
                <h1>Murmur Wall</h1>
                <PostsContainer>
                    {posts.map((post) => (
                        <div key={post.id}>
                            <h3>{post.authorId}</h3>
                            <p>{post.content}</p>
                            <p>{post.created}</p>
                        </div>
                    ))}
                </PostsContainer>
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

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid black;
`;
