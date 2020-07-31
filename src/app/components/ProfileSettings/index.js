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
          <Button to="/Accounts/edit/" buttonStyle="btn--white--outline">
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
            <input
              className="ProfilePictureInput"
              ref={element}
              type="file"
              name="profilePicture"
              onChange={handleChangeProfilePicture}
            />
            <Button
              buttonStyle={'btn--white--solid'}
              onClick={() => selectProfilePicture()}
              modal
            >
              Change Profile Picture
            </Button>
            <Button
              to={`/accounts/password/change`}
              buttonStyle={'btn--white--solid'}
              modal
            >
              Change Password
            </Button>
            <Button
              to={`/accounts/edit`}
              buttonStyle={'btn--white--solid'}
              modal
            >
              Edit Bio
            </Button>

            <Button
              onClick={() => {
                dispatch(authentication.actions.logoutUser(token));
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
      ) : followers.includes(activeUser._id) ? (
        <>
          <Button marginRight buttonStyle="btn--white--outline">
            Message
          </Button>
          <Button
            onClick={toggleUserFollow}
            marginRight
            buttonStyle="btn--white--outline"
          >
            Unfollow
          </Button>
        </>
      ) : (
        <Button onClick={toggleUserFollow} buttonStyle="btn--blue--outline">
          Follow
        </Button>
      )}
    </div>
  );
}

export default ProfileSettings;
