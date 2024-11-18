 
import { useEffect,useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
        .then(response => {
          response.json().then(postInfo => {
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setContent(postInfo.content);
          });
        });
      }, []);

    async function updatePost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0]){
          data.set('file', files?.[0]);
        }
        
        try {
          const response = await fetch(`http://localhost:4000/post/${id}`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          setRedirect(true);
        } catch (error) {
          console.error(error);
        }
      }


    if (redirect) {
      return <Navigate to={`/post/${id}`} />;
    }
    return (
        <div className="create-post-form">
          <h2>Edit Post</h2>
          <form onSubmit={updatePost}>
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
              <textarea 
              id="summary"
               placeholder="Enter summary"
                rows="5"
                value={summary}
               onChange={(e) => setSummary(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input 
              type="file" 
              name="file"
              onChange={(e) => setFiles(e.target.files)} />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content:</label>
               <Editor onChange={setContent} value={content} />
            </div>
            <button type="submit">Update Post</button>
          </form>
        </div>
      );
    }