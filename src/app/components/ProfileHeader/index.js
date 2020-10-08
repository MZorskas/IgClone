import React, { useEffect, setState, useState, useRef } from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import authentication from '../../../authentication';
import users from '../../../users';

//image
import UserAvatar from '../../images/user.png';

//Components
import ProfileSettings from '../ProfileSettings';
import ProfileStats from '../ProfileStats';
import ProfileBio from '../ProfileBio';
import Button from '../Button';
import Modal from '../Modal';

function ProfileHeader() {
  const { username } = useParams();
  // const [element, setElement] = useState(null);
  const element = useRef(null);
  console.log(element);
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const token = useSelector(authentication.selectors.token);
  const profileUser = useSelector((state) =>
    users.selectors.getProfileUser(state, username)
  );
  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Modal Functions
  const openPictureModal = () => {
    setShowModal(true);
  };
  const closePictureModal = () => {
    setShowModal(false);
  };

  const selectProfilePicture = () => {
    // console.log(element.current);
    // document.getElementById('ProfilePictureInput').click();
    element.current.click();
  };

  const changeProfilePicture = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files.length == 0 || e.target.files.length > 1) return;
    const picture = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', picture);
    console.log(formData);
    dispatch(authentication.actions.uploadProfilePicture(formData, token));
    // closePictureModal();
    setShowModal(false);
  };

  // console.log('ProfileHeader', profileUser);
  return (
    <header className="ProfileHeader">
      {!!profileUser && (
        <div className="ProfileUser">
          <div className="ProfileAvatarContainer">
            {profileUser.username === activeUser.username ? (
              <img
                className="ProfileAvatar"
                id="ProfileAvatar"
                src={
                  activeUser.profilePicture
                    ? activeUser.profilePicture
                    : 'https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png'
                }
                onClick={openPictureModal}
              />
            ) : (
              <img
                className="ProfileAvatar"
                id="ProfileAvatar"
                src={
                  profileUser.profilePicture
                    ? profileUser.profilePicture
                    : 'https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png'
                }
              />
            )}
            <Modal closeModal={closePictureModal} showModal={showModal}>
              <Button
                type={'file'}
                buttonStyle={'btn--secondary--solid'}
                onClick={selectProfilePicture}
                modal
              >
                Change Profile Picture
              </Button>
              <input
                ref={element}
                className="ProfilePictureInput"
                type="file"
                name="profilePicture"
                onChange={changeProfilePicture}
              />
              <Button buttonStyle={'btn--secondary--solid'} modal>
                Remove Current Picture
              </Button>
              <Button
                buttonStyle={'btn--secondary--solid'}
                onClick={closePictureModal}
                modal
              >
                Cancel
              </Button>
            </Modal>
          </div>
          <div className="ProfileInfo">
            <ProfileSettings
              element={element}
              selectProfilePicture={selectProfilePicture}
              changeProfilePicture={changeProfilePicture}
              show={showModal}
            />
            <ProfileStats username={profileUser.username} />
            <ProfileBio fullName={profileUser.fullName} />
          </div>
        </div>
      )}
    </header>
  );
}

export default ProfileHeader;
