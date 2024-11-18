import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../Usercontext";

import { useNavigate } from 'react-router-dom';
export default function PostPage(){
    const navigate = useNavigate();
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
        .then(res => {
            res.json().then(postInfo => {
                setPostInfo(postInfo);
            });
    });
    }, []);

    if(!postInfo) return <div>No posts...</div>;

    const handleEditPost = (postId) => {
        navigate(`/edit/${postId}`);
      };

    const handleDeletePost = async (postId) => {
        try {
          const response = await fetch(`http://localhost:4000/post/${postId}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          // Redirect to a different page or refresh the current page
          window.location.reload();
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      };
      

      
    return(
        <div className="post-page">
            <div className="post-header">
            <h1>{postInfo.title}</h1>
        <p class="author">By {postInfo.author.username}</p>
        {userInfo.id === postInfo.author._id &&
            <button onClick={() => handleDeletePost(postInfo._id)}>Delete</button>
        }
        {userInfo.id === postInfo.author._id &&
            <button onClick={() => handleEditPost(postInfo._id)}>Edit Post</button>
}
        <p class="date-created">{format((postInfo.createdAt), "MMM d, yyyy HH:mm")}</p>
        </div>
        <div className="image">
            <img src={'http://localhost:4000/' + postInfo.cover} alt=""/>
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{__html: postInfo.content}}></div>
            </div>
    );
}