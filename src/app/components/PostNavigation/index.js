import React, { useState } from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { Like, Comment, SavedIcon24 } from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import Button from '../Button';
import Modal from '../Modal';

function PostNavigation({ username }) {
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const [showModal, setShowModal] = useState(false);

  const togglePostLike = () => {};

  const togglePostSaved = () => {};

  const focusCommentInput = () => {};

  console.log('ProfileSettings', username);
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
          <SavedIcon24 />
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
