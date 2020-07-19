import React from 'react';

import './index.scss';
import { Link } from 'react-router-dom';
import { LikeOverlay, CommentOverlay } from '../icons';

function PostCard({
  placeHolder,
  postId,
  elementRef,
  grid,
  commentsCount,
  likeCount,
}) {
  const layout = grid ? 'PostCardGrid' : 'PostCard';
  return (
    <div ref={elementRef} className={layout}>
      <img src={placeHolder} alt="Post Image" />
      <Link to={{ pathname: `/p/${postId}`, state: { postId } }}>
        <div className="PostOverlay">
          <div className="PostOverlayInfo">
            <LikeOverlay /> <h3>{likeCount}</h3>
          </div>
          <div className="PostOverlayInfo">
            <CommentOverlay /> <h3>{commentsCount}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
