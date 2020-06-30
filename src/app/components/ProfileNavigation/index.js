import React, { useState } from 'react';
import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import {
  SavedIcon12,
  PostsIcon,
  SavedIconActive12,
  PostsIconActive,
} from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import Button from '../Button';
import Modal from '../Modal';

function ProfileNavigation({ username }) {
  const location = useLocation();
  // console.log('ProfileNavigation', location);

  //Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);

  //Modal
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

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
      {username === activeUser.username && (
        <Link
          className={
            location.pathname === `/${username}/saved`
              ? 'Tab Tab--Active'
              : 'Tab'
          }
          to={{ pathname: `/${username}/saved` }}
        >
          {location.pathname === `/${username}` ? (
            <SavedIconActive12 />
          ) : (
            <SavedIcon12 />
          )}
          Saved
        </Link>
      )}
    </div>
  );
}

export default ProfileNavigation;
