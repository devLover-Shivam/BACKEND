import React, { useState,useEffect } from 'react'
import axios from 'axios';
const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id:"1",
            image:"https://i.pinimg.com/736x/5e/f2/0b/5ef20b73a5cd6995070bd41ce25d3e08.jpg",
            caption:"Beautiful Idea",
        }
    ]);

    useEffect(()=>{
        axios.get("http://localhost:3000/posts")
        .then((res)=>{
            setPosts(res.data.posts)
        })
    },[])
  return (
    <section className='feed-section'>
        {
            posts.length > 0 ? (
                posts.map((post) =>(
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                ))
            ) : (
                <h1>No Posts Available</h1>
            )
        }
    </section>
  )
}

export default Feed
