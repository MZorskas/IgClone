import React, { useEffect, useState, useRef, useCallback } from 'react';

import './index.scss';
import { Link } from 'react-router-dom';

function PostCard({ placeHolder, postId, likes, comments, elementRef, grid }) {
  // console.log('PostCard', placeHolder, postId, likes, key, comments);
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
