import React, { useState, useEffect } from 'react';
import './index.scss';
import { Link, useParams } from 'react-router-dom';
import { Options } from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import feed from '../../../feed';
import Button from '../Button';
import Modal from '../Modal';

function PostHeader({ children, placeHolder }) {
  const { postId } = useParams();

  const [url, setUrl] = useState(window.location.href);

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

  const deletePost = () => {
    dispatch(feed.actions.deletePost(postId, token));
    setShowModal(false);
  };

  return (
    <div className="PostHeader">
      <div className="PostAvatar">
        <Link to="/">
          <img className="AuthorAvatar" id="ProfileAvatar" src={placeHolder} />
        </Link>
      </div>
      <span className="PostUser">{children}</span>
      <a
        className="Options"
        onClick={() => {
          openOptionsModal();
        }}
      >
        <Options />
      </a>
      <Modal closeModal={closeOptionsModal} showModal={showModal}>
        <Button buttonStyle={'btn--white--solid'} modal>
          Go To Post
        </Button>
        <Button
          onClick={deletePost}
          buttonStyle={'btn--white--solid'}
          modal
          danger
        >
          Delete Post
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

export default PostHeader;
