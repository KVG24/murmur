import { useState, useEffect } from "react";
import useAPI from "../hooks/useAPI";
import styled from "styled-components";
import Post from "../components/Post";

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
                        <Post key={post.id} postData={post} />
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
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 0.5rem;
`;
