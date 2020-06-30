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
  // const logoutUser = bindActionCreators(
  //   authentication.actions.logoutUser,
  //   dispatch
  // );
  const createPost = bindActionCreators(feed.actions.createPost, dispatch);

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  // const error = useSelector(authentication.selectors.getLogoutError);
  // const loading = useSelector(authentication.selectors.isLogoutLoading);

  const { profilePicture, username } = useSelector(
    authentication.selectors.getActiveUser
  );

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  // Modal functions
  const openNewPostModal = () => {
    setShowModal(true);
  };
  const closeNewPostModal = () => {
    setShowModal(false);
  };

  const selectDescription = (e) => {
    setDescription(e.target.value);
  };

  const selectPicture = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files.length == 0 || e.target.files.length > 1) return;
    setFile(e.target.files[0]);
  };

  const handleCreatePost = () => {
    if (!file) return console.log('Select FILE!');
    const formData = new FormData();
    formData.append('postFile', file);
    formData.append('description', description);
    console.log(formData);
    createPost(formData, token);
    setShowModal(false);
  };

  console.log('Header username', username);
  console.log('Header profilePicture', profilePicture);

  const handleLogout = () => {
    // logoutUser(token);
    dispatch(authentication.actions.logoutUser(token));
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
          {!isAuthorized ? (
            <>
              <Button
                to={{ pathname: '/login', state: { referrer: location } }}
                buttonStyle={'btn--blue--solid'}
              >
                Log In
              </Button>

              <Button to={'/register'} buttonStyle={'btn--white--solid'}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
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
                <h1>New Post</h1>
                <div className="ImagePreview" id="ImagePreview">
                  <img
                    src=""
                    alt="Image Preview"
                    className="ImagePreviewContainer"
                  />
                  <span className="image-preview-default-text">
                    Image Preview
                  </span>
                </div>
                <input type="file" onChange={selectPicture} />
                <form className="NewPostForm">
                  <h4>Description</h4>
                  <textarea
                    className="FormTextarea"
                    value={description}
                    onChange={selectDescription}
                  ></textarea>
                </form>
                <div className=""></div>
                <Button
                  onClick={handleCreatePost}
                  buttonStyle={'btn--white--solid'}
                  modal
                >
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
