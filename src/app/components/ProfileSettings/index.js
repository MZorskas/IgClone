import React, { useState } from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  HomeFilledIcon,
  NewPost,
  ExploreFilledIcon,
  ExploreIcon,
  SettingsIcon,
} from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import Button from '../Button';
import Modal from '../Modal';

function ProfileSettings({ username }) {
  const activeUser = useSelector(authentication.selectors.getActiveUser);

  // Dispatch
  const dispatch = useDispatch();
  const logoutUser = bindActionCreators(
    authentication.actions.logoutUser,
    dispatch
  );
  // Selectors
  const token = useSelector(authentication.selectors.token);

  const [showModal, setShowModal] = useState(false);

  const openSettingsModal = () => {
    setShowModal(true);
  };
  const closeSettingsModal = () => {
    setShowModal(false);
  };

  console.log('ProfileSettings', username);
  return (
    <div className="ProfileSettings">
      <h1 className="ProfileUsername" id="ProfileUsername">
        {username ? username : 'Username'}
      </h1>
      {username === activeUser.username ? (
        <>
          <Button to="/profile/edit" buttonStyle="btn--white--outline">
            Edit Profile
          </Button>
          <a
            className="Settings"
            onClick={() => {
              openSettingsModal();
            }}
          >
            <SettingsIcon />
          </a>
          <Modal closeModal={closeSettingsModal} showModal={showModal}>
            <Button buttonStyle={'btn--white--solid'} modal>
              Change Profile Picture
            </Button>
            <Button buttonStyle={'btn--white--solid'} modal>
              Change Password
            </Button>
            <Button buttonStyle={'btn--white--solid'} modal>
              Edit Bio
            </Button>
            <Button
              onClick={() => {
                logoutUser(token);
              }}
              buttonStyle={'btn--white--solid'}
              modal
            >
              Log Out
            </Button>
            <Button
              buttonStyle={'btn--white--solid'}
              onClick={closeSettingsModal}
              modal
            >
              Cancel
            </Button>
          </Modal>
        </>
      ) : (
        <>
          <Button buttonStyle="btn--blue--outline">Follow</Button>
          <Link to="/">
            <SettingsIcon />
          </Link>
        </>
      )}
    </div>
  );
}

export default ProfileSettings;
