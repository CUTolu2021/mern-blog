import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { set } from "mongoose";
import Editor from "../Editor";

   

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file',files[0]);
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
          });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setRedirect(true);
      } catch (error) {
        console.error('Error:', error);
      }
        
    }
    if(redirect) {
        return <Navigate to={'/'} />
    }
    
    return (
      <div className="create-post-form">
        <h2>Create Post</h2>
        <form onSubmit={createNewPost}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text"
             id="title"
            placeholder="Enter title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="summary">Summary:</label>
            <textarea id="summary"
             placeholder="Enter summary"
              rows="5"
             onChange={(e) => setSummary(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input type="file" 
            onChange={(e) => setFiles(e.target.files)} />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <Editor onChange={setContent} value={content} />
            </div>
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  }