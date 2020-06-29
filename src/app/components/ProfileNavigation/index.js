import React, { useState } from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import {
  SavedIcon,
  PostsIcon,
  SavedIconActive,
  PostsIconActive,
} from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import Button from '../Button';
import Modal from '../Modal';

function ProfileNavigation({ username }) {
  const location = useLocation();
  console.log('ProfileNavigation', location);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  //   const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <div className="ProfileNavigation">
      <Link
        className={
          location.pathname === `/${username}` ? 'Tab Tab--Active' : 'Tab'
        }
        to={{ pathname: `/${username}` }}
      >
        {location.pathname === `/${username}` ? (
          <PostsIconActive />
        ) : (
          <PostsIcon />
        )}
        Posts
      </Link>
      <Link
        className={
          location.pathname === `/${username}/saved` ? 'Tab Tab--Active' : 'Tab'
        }
        to={{ pathname: `/${username}/saved` }}
      >
        {location.pathname === `/${username}` ? (
          <SavedIconActive />
        ) : (
          <SavedIcon />
        )}
        Saved
      </Link>
      {/* <button
        onClick={() => {
          openModal();
        }}
      >
        Show Modal
      </button>
      <Modal closeModal={closeModal} showModal={showModal}>
        <Button buttonStyle={'btn--white--solid'} modal>
          Change Profile Picture
        </Button>
        <Button buttonStyle={'btn--white--solid'} modal>
          Change Password
        </Button>
        <Button buttonStyle={'btn--white--solid'} modal>
          Edit Bio
        </Button>
        <Button buttonStyle={'btn--white--solid'} modal>
          Log Out
        </Button>
        <Button buttonStyle={'btn--white--solid'} onClick={closeModal} modal>
          Cancel
        </Button>
      </Modal> */}
    </div>
  );
}

export default ProfileNavigation;
