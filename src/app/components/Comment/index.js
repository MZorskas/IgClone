import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { CommentOptions, CommentUnlike, CommentLike } from '../icons';
import { useSelector, useDispatch } from 'react-redux';

// Modules
import authentication from '../../../authentication';
import feed from '../../../feed';

// Components
import Button from '../Button';
import Modal from '../Modal';
import Date from '../Date';

function Comment({
  placeHolder,
  username,
  commentId,
  children,
  postUserId,
  description,
  postId,
  creationDate,
  likesCount,
  likes = [],
}) {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const token = useSelector(authentication.selectors.token);
  // const comment = useSelector((state) =>
  //   feed.selectors.getComment(state, commentId)
  // );
  const toggleLikeComment = () => {
    dispatch(feed.actions.toggleLikeComment(commentId, token));
  };

  const deleteComment = () => {
    dispatch(feed.actions.deleteComment(commentId, token));
    setShowModal(false);
  };

  // Modal
  const [showModal, setShowModal] = useState(false);

  const openOptionsModal = () => {
    setShowModal(true);
  };
  const closeOptionsModal = () => {
    setShowModal(false);
  };

  return (
    <div className="Comment">
      <div className="CommentAvatar">
        <Link to={`/${username}`}>
          <img className="AuthorProfilePicture" src={placeHolder} />
        </Link>
      </div>
      <div className="CommentContent">
        <span>{username}</span>
        <p className="CommentText">{children}</p>
        <div className="CommentNavigation">
          <Date postId={postId} creationDate={creationDate} comment />
          {!!likesCount && (
            <span className="CommentLikes">
              {likesCount} {likes.length === 1 ? 'like' : 'likes'}
            </span>
          )}
        </div>
        {(activeUser.username === username || activeUser._id === postUserId) &&
        !description ? (
          <div className="CommentOptions">
            <a
              // className="CommentOptions"
              onClick={() => {
                openOptionsModal();
              }}
            >
              <CommentOptions />
            </a>
          </div>
        ) : null}
      </div>
      {!description && (
        <a
          className="CommentLike"
          onClick={() => {
            toggleLikeComment();
          }}
        >
          {likes.includes(activeUser._id) ? <CommentLike /> : <CommentUnlike />}
        </a>
      )}
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
