import React from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, HomeFilledIcon, NewPost } from '../icons';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';

function Header() {
  const location = useLocation();
  // Dispatch
  const dispatch = useDispatch();
  const logoutUser = bindActionCreators(
    authentication.actions.logoutUser,
    dispatch
  );

  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  // const error = useSelector(authentication.selectors.getLogoutError);
  // const loading = useSelector(authentication.selectors.isLogoutLoading);

  console.log('Header', isAuthorized);

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
          <Link to="/" className="NavIcon">
            <NewPost />
          </Link>
          <Link to="/profile" className="NavIcon">
            <img
              className="profilePicture"
              alt="profilePicture"
              id="userPictureNavbar"
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
