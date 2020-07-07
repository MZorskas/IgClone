import React from 'react';

import './index.scss';
import PostNavigation from '../PostNavigation';
import PostHeader from '../PostHeader';
import PostNewComment from '../PostNewComment';
import PostFileContainer from '../PostFileContainer';
import PostComments from '../PostComments';

function PostBlock({ postId }) {
  return (
    <div className="PostBlock">
      <PostHeader postId={postId} />
      <PostFileContainer block postId={postId} />
      <PostComments block postId={postId} />
      <PostNavigation postId={postId} />
      <PostNewComment postId={postId} />
    </div>
  );
}

export default PostBlock;
