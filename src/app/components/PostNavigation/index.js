import React, { useState } from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Like, Comment, SaveIcon24, SaveIconActive24 } from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import feed from '../../../feed';
import Button from '../Button';
import Modal from '../Modal';

function PostNavigation() {
  const { postId } = useParams();

  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const post = useSelector((state) => feed.selectors.getPost(state, postId));
  const userId = useSelector(authentication.selectors.getActiveUserId);

  const [showModal, setShowModal] = useState(false);

  const togglePostLike = () => {};

  const togglePostSaved = () => {
    dispatch(feed.actions.toggleSavePost(postId, token));
  };

  const focusCommentInput = () => {};

  console.log('PostNavigation saved', !!post.saves.includes(userId));
  console.log('PostNavigation liked ');
  console.log('PostNavigation post ', userId);
  return (
    <div className="PostNavigation">
      <div className="PostActions">
        <a
          className="PostIcon"
          onClick={() => {
            togglePostLike();
          }}
        >
          <Like />
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
          Likes count
        </Link>
      </div>
      <div className="PostDate">
        <Link to="/p/:postId" className="Date">
          Date
        </Link>
      </div>
    </div>
  );
}

export default PostNavigation;
