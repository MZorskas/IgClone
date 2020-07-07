import React from 'react';

import './index.scss';
import { Link } from 'react-router-dom';

function PostCard({ placeHolder, postId, elementRef, grid }) {
  const layout = grid ? 'PostCardGrid' : 'PostCard';
  return (
    <div ref={elementRef} className={layout}>
      <Link to={{ pathname: `/p/${postId}`, state: { postId } }}>
        <img src={placeHolder} alt="Post Image" />
      </Link>
    </div>
  );
}

export default PostCard;
