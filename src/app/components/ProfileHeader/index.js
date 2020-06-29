import React, { useEffect, setState, useState, useMemo } from 'react';
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
function ProfileHeader({
  username,
  fullName,
  followers,
  following,
  profilePicture,
}) {
  // Dispatch
  const dispatch = useDispatch();
  const updateProfilePicture = bindActionCreators(
    authentication.actions.uploadProfilePicture,
    dispatch
  );

  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const user = useSelector((state) =>
    users.selectors.isUserFetched(state, username)
  );
  const token = useSelector(authentication.selectors.isAuthorized);

  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Modal Functions
  const openPictureModal = () => {
    setShowModal(true);
  };
  const closePictureModal = () => {
    setShowModal(false);
  };

  const selectProfilePicture = (e) => {
    document.getElementById('ProfilePictureInput').click();
    // if (e.target.files.length == 0 || e.target.files.length > 1) return;
    // const picture = e.target.files[0];
    // const formData = new FormData();
    // formData.append('profilePicture', picture);
    // console.log(formData);
    // updateProfilePicture(formData, token);
  };

  const changeProfilePicture = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files.length == 0 || e.target.files.length > 1) return;
    const picture = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', picture);
    console.log(formData);
    updateProfilePicture(formData, token);
    closePictureModal();
  };

  return (
    <header className="ProfileHeader">
      {!!user && !!activeUser && (
        <div className="ProfileUser">
          <div className="ProfileAvatarContainer">
            {username === activeUser.username ? (
              <img
                className="ProfileAvatar"
                id="ProfileAvatar"
                src={
                  profilePicture
                    ? profilePicture
                    : 'https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png'
                }
                onClick={openPictureModal}
              />
            ) : (
              <img
                className="ProfileAvatar"
                id="ProfileAvatar"
                src="https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png"
              />
            )}
            {/* <input
              id="ProfilePictureInput"
              type="file"
              name="profilePicture"
              onChange={changeProfilePicture}
            /> */}
            <Modal closeModal={closePictureModal} showModal={showModal}>
              {/* <label
                className="btn btn--modal btn--white--solid"
                htmlFor="ProfilePictureInput"
              >
                {' '}
              </label> */}
              <input
                id="ProfilePictureInput"
                type="file"
                name="profilePicture"
                onChange={changeProfilePicture}
              />

              <Button
                type={'file'}
                buttonStyle={'btn--white--solid'}
                onClick={selectProfilePicture}
                modal
              >
                Change Profile Picture
              </Button>

              <Button buttonStyle={'btn--white--solid'} modal>
                Remove Current Picture
              </Button>
              <Button
                buttonStyle={'btn--white--solid'}
                onClick={closePictureModal}
                modal
              >
                Cancel
              </Button>
            </Modal>
          </div>
          <div className="ProfileInfo">
            <ProfileSettings username={username} />
            <ProfileStats followers={followers} following={following} />
            <ProfileBio fullName={fullName} />
          </div>
        </div>
      )}
    </header>
  );
}

// const enhance = connect(
//   (state, { username }) => {
//     console.log('ProfileHeader', state, username);
//     return {
//       user: users.selectors.isUserFetched(state, username),
//     };
//   },
//   (dispatch) => {
//     return {
//       fetchUser: bindActionCreators(users.actions.fetchSingleUser, dispatch),
//     };
//   }
// );

// export default enhance(ProfileHeader);

export default ProfileHeader;
