import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function PostCard({ placeHolder, postId, likes, comments }) {
  // console.log('PostCard', placeHolder, postId, likes, key, comments);
  return (
    <div className="PostCard">
      <Link to={{ pathname: `/p/${postId}`, state: { postId } }}>
        <img src={placeHolder} alt="Post Image" />
      </Link>
    </div>
  );
}

export default PostCard;
