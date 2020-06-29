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
} from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import users from '../../../users';
import feed from '../../../feed';

//image
import UserAvatar from '../../images/user.png';

//Components
import Modal from '../../components/Modal';
import Button from '../../components/Button';

function Header() {
  const location = useLocation();

  // Dispatch
  const dispatch = useDispatch();
  const logoutUser = bindActionCreators(
    authentication.actions.logoutUser,
    dispatch
  );
  const createPost = bindActionCreators(feed.actions.createPost, dispatch);

  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  // const error = useSelector(authentication.selectors.getLogoutError);
  // const loading = useSelector(authentication.selectors.isLogoutLoading);

  const { profilePicture, username } = useSelector(
    authentication.selectors.getActiveUser
  );

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  // Modal functions
  const openNewPostModal = () => {
    setShowModal(true);
  };
  const closeNewPostModal = () => {
    setShowModal(false);
  };

  const uploadPicture = (event) => {
    console.log(URL.createObjectURL(event.target.files[0]));
    setFile();
    console.log(file);
  };

  console.log('Header username', username);
  console.log('Header profilePicture', profilePicture);

  const handleLogout = () => {
    logoutUser(isAuthorized);
  };

  return (
    <header className="Header">
      <nav className="Navbar">
        <Link to="/" className="Logo">
          INSTAGRAM CLONE
        </Link>
        <input
          type="text"
          placeholder="Search"
          defaultValue=""
          onChange={() => {
            alert('not Working');
          }}
        />
        <div className="NavigationLinks">
          <Link to="/" className="NavIcon">
            {location.pathname === '/' ? <HomeFilledIcon /> : <HomeIcon />}
          </Link>
          <a
            className="NavIcon"
            onClick={() => {
              openNewPostModal();
            }}
          >
            <NewPost />
          </a>
          <Modal post closeModal={closeNewPostModal} showModal={showModal}>
            {/* <label
                className="btn btn--modal btn--white--solid"
                htmlFor="ProfilePictureInput"
              >
                {' '}
              </label> */}
            {/* <input
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
            </Button> */}
            <h1>New Post</h1>
            <div className="ImagePreview" id="ImagePreview">
              <img
                src=""
                alt="Image Preview"
                className="ImagePreviewContainer"
              />
              <span className="image-preview-default-text">Image Preview</span>
            </div>
            <input type="file" onChange={uploadPicture} />
            <form className="NewPostForm">
              <h4>Description</h4>
              <textarea className="FormTextarea"></textarea>
            </form>

            <Button buttonStyle={'btn--white--solid'} modal>
              Create Post
            </Button>
            <Button
              buttonStyle={'btn--white--solid'}
              onClick={closeNewPostModal}
              modal
            >
              Cancel
            </Button>
          </Modal>
          <Link to="/explore" className="NavIcon">
            {location.pathname === '/explore' ? (
              <ExploreFilledIcon />
            ) : (
              <ExploreIcon />
            )}
          </Link>
          <Link
            to={{ pathname: `/${username}`, state: { username } }}
            className="NavIcon"
          >
            <img
              src={
                profilePicture
                  ? profilePicture
                  : 'https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png.png '
              }
              alt="userAvatar"
              className={
                location.pathname === `/${username}`
                  ? 'userAvatarNavbar userAvatarNavbar--active'
                  : 'userAvatarNavbar'
              }
              id="userAvatarNavbar"
            />
          </Link>
          <Link to="/" className="NavIcon" onClick={handleLogout}>
            <NewPost />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
