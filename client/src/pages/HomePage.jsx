import { useEffect, useState } from "react"
import { get_posts } from "../api/post-api"

function HomePage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function loadPosts() {
            let posts = await get_posts();
            setPosts(posts);
        }
        loadPosts();
    }, [])

return (<div className='home-page'>
    <h1>Posts</h1>  
    <div className='post-list'>
    {posts.map((post, i) => {
        return <div className='post-container' key={i}>
            <h3 className='post-title'>{post.title}</h3>
            <p className='post-description'>{post.description}</p>
            <img src={post.thumbnail} className='post-image'></img>
            <h4>Autor: {post.author_username}</h4>
            <p>Objetivo: ${post.goal}</p>
            <p>Recaudacion: ${post.income}</p>
        </div>
        })}
    </div>
        
    </div>)
}

export default HomePage