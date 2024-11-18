import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
export default function Post({_id,title, summary, cover,content,createdAt,author}) {

    return (
      <div class="post">
        <div class="image">
          <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover}></img>
        </Link>
        </div>
        <div class="texts">
          <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          </Link>
          <p class="info">
            <a class="author">{author.username}</a>
            <time>{format((createdAt), "MMM d, yyyy HH:mm")}</time>
          </p>
          <p class="summary">
            {summary}
          </p>
        </div>
      </div>
    );
  }
  