import React, { useState, useRef } from 'react';
import './index.scss';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  HomeFilledIcon,
  NewPost,
  ExploreFilledIcon,
  ExploreIcon,
} from '../icons';
import { useSelector, useDispatch } from 'react-redux';

//Modules
import authentication from '../../../authentication';
import feed from '../../../feed';

//image
import UserAvatar from '../../images/user.png';

//Components
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Search from '../HeaderSearch';

function Header() {
  const location = useLocation();
  const inputRef = useRef();
  // Dispatch
  const dispatch = useDispatch();

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
  const [imagePreview, setImagePreview] = useState(null);
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
    if (e.target.files.length == 0 || e.target.files.length > 1) return;
    setFile(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  };

  const handleCreatePost = () => {
    if (!file) return console.log('Select FILE!');
    const formData = new FormData();
    formData.append('postFile', file);
    formData.append('description', description);
    console.log(formData);
    dispatch(feed.actions.createPost(formData, token));
    setFile(null);
    setDescription('');
    setShowModal(false);
  };

  // console.log('Header username', username);
  // console.log('Header profilePicture', profilePicture);

  const handleLogout = () => {
    // logoutUser(token);
    dispatch(authentication.actions.logoutUser(token));
  };

  const selectInput = () => {
    // document.getElementById('fileSelect').click();
    inputRef.current.click();
  };

  return (
    <header className="Header">
      <nav className="Navbar">
        <Link to="/" className="Logo">
          INSTAGRAM CLONE
        </Link>
        <Search />
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
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="ImagePreviewContainer"
                    />
                  ) : (
                    <h3>Select your image</h3>
                  )}
                </div>
                <input
                  type="file"
                  id="fileSelect"
                  style={{ display: 'none' }}
                  onChange={selectPicture}
                  ref={inputRef}
                />
                <Button buttonStyle={'btn--white--solid'} onClick={selectInput}>
                  Choose File
                </Button>
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
