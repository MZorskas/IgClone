import React, { useState } from 'react';
import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import { Options } from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import Button from '../Button';
import Modal from '../Modal';

function PostHeader({ children }) {
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

  return (
    <div className="PostHeader">
      <div className="PostAvatar">
        <Link>
          <img
            className="AuthorAvatar"
            id="ProfileAvatar"
            src="https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png"
          />
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
        <Button buttonStyle={'btn--white--solid'} modal>
          Copy Link
        </Button>
        <Button buttonStyle={'btn--white--solid'} modal danger>
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
