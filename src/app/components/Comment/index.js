import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { CommentOptions } from '../icons';
import { useSelector, useDispatch } from 'react-redux';

// Modules
import authentication from '../../../authentication';
import feed from '../../../feed';

// Components
import Button from '../Button';
import Modal from '../Modal';

function Comment({ placeHolder, username, commentId, children }) {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const token = useSelector(authentication.selectors.token);

  // Modal
  const [showModal, setShowModal] = useState(false);

  const openOptionsModal = () => {
    setShowModal(true);
  };
  const closeOptionsModal = () => {
    setShowModal(false);
  };

  const deleteComment = () => {
    dispatch(feed.actions.deleteComment(commentId, token));
    setShowModal(false);
  };

  return (
    <div className="CommentContainer">
      <div className="CommentAvatar">
        <Link to="/">
          <img className="AuthorProfilePicture" src={placeHolder} />
        </Link>
      </div>
      <div className="Comment">
        <span>{username}</span>
        <p className="CommentText">{children}</p>
      </div>
      <a
        className="CommentOptions"
        onClick={() => {
          openOptionsModal();
        }}
      >
        <CommentOptions />
      </a>
      <Modal closeModal={closeOptionsModal} showModal={showModal}>
        <Button
          buttonStyle={'btn--white--solid'}
          onClick={deleteComment}
          modal
          danger
        >
          Delete Comment
        </Button>
        <Button
          buttonStyle={'btn--white--solid'}
          onClick={closeOptionsModal}
          modal
        >
          Cancel
        </Button>
      </Modal>
    </div>
  );
}

export default Comment;
