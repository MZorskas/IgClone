import React, { useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SettingsIcon } from '../icons';

//Modules
import authentication from '../../../authentication';

//Components
import users from '../../../users';
import Button from '../Button';
import Modal from '../Modal';

function ProfileSettings({
  selectProfilePicture,
  changeProfilePicture,
  element,
}) {
  const { username } = useParams();

  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const token = useSelector(authentication.selectors.token);
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const { _id, followers } = useSelector((state) =>
    users.selectors.getProfileUser(state, username)
  );

  const [showModal, setShowModal] = useState();

  const openSettingsModal = () => {
    setShowModal(true);
  };
  const closeSettingsModal = () => {
    setShowModal(false);
  };

  const handleChangeProfilePicture = (file) => {
    changeProfilePicture(file);
    closeSettingsModal();
  };

  const toggleUserFollow = () => {
    dispatch(users.actions.toggleFollowUser(_id, token));
  };

  return (
    <div className="ProfileSettings">
      <h1 className="ProfileUsername" id="ProfileUsername">
        {username ? username : 'Username'}
      </h1>
      {username === activeUser.username ? (
        <>
          <Button to="/Accounts/edit/" buttonStyle="btn--secondary--outline">
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
            <Button
              buttonStyle={'btn--secondary--solid'}
              onClick={() => selectProfilePicture()}
              modal
            >
              Change Profile Picture
            </Button>
            <input
              className="ProfilePictureInput"
              ref={element}
              type="file"
              name="profilePicture"
              onChange={handleChangeProfilePicture}
            />
            <Button
              to={`/accounts/password/change`}
              buttonStyle={'btn--secondary--solid'}
              modal
            >
              Change Password
            </Button>
            <Button
              to={`/accounts/edit`}
              buttonStyle={'btn--secondary--solid'}
              modal
            >
              Edit Bio
            </Button>

            <Button
              onClick={() => {
                dispatch(authentication.actions.logoutUser(token));
              }}
              buttonStyle={'btn--secondary--solid'}
              modal
            >
              Log Out
            </Button>
            <Button
              buttonStyle={'btn--secondary--solid'}
              onClick={closeSettingsModal}
              modal
            >
              Cancel
            </Button>
          </Modal>
        </>
      ) : followers.includes(activeUser._id) ? (
        <>
          <Button marginRight buttonStyle="btn--secondary--outline">
            Message
          </Button>
          <Button
            onClick={toggleUserFollow}
            marginRight
            buttonStyle="btn--secondary--outline"
          >
            Unfollow
          </Button>
        </>
      ) : (
        <Button onClick={toggleUserFollow} buttonStyle="btn--primary--outline">
          Follow
        </Button>
      )}
    </div>
  );
}

export default ProfileSettings;
