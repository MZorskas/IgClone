import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Like, Unlike, Comment, SaveIcon24, SaveIconActive24 } from '../icons';
import { useSelector, useDispatch } from 'react-redux';

import Date from '../Date';

//Modules
import authentication from '../../../authentication';
import feed from '../../../feed';

function PostNavigation({ postId }) {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const post = useSelector((state) => feed.selectors.getPost(state, postId));
  const userId = useSelector(authentication.selectors.getActiveUserId);

  const [showModal, setShowModal] = useState(false);

  const togglePostLike = () => {
    dispatch(feed.actions.toggleLikePost(postId, token));
  };

  const togglePostSaved = () => {
    dispatch(feed.actions.toggleSavePost(postId, token));
  };

  const focusCommentInput = () => {};

  return (
    <div className="PostNavigation">
      <div className="PostActions">
        <a
          className="PostIcon"
          onClick={() => {
            togglePostLike();
          }}
        >
          {post.likes.includes(userId) ? <Unlike /> : <Like />}
        </a>
        <a
          className="PostIcon"
          onClick={() => {
            focusCommentInput();
          }}
        >
          <Comment />
        </a>
        <a
          className="PostIcon"
          onClick={() => {
            togglePostSaved();
          }}
        >
          {post.saves.includes(userId) ? <SaveIconActive24 /> : <SaveIcon24 />}
        </a>
      </div>
      <div className="PostLikes">
        <Link to="/p/:postId" className="Likes">
          <span>{post.likeCount}</span>
          {post.likeCount === 1 ? ' like' : ' likes'}
        </Link>
      </div>
      <Date postId={postId} creationDate={post.creationDate} />
    </div>
  );
}

export default PostNavigation;
