import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function PostCommentsContainer() {
  return (
    <div className="PostCommentsContainer">
      <div className="Comment">
        <Link to="/profilePage" className="CommentUsername">
          Username
        </Link>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elitLorem ipsum
          dolor sitLorem ipsum dolor sit
        </p>
      </div>
      <div className="PostNewComment"></div>
    </div>
  );
}

export default PostCommentsContainer;
