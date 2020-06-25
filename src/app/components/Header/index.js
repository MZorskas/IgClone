import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { HomeIcon, HomeFilledIcon, NewPost } from '../icons';

function Header() {
  const location = useLocation();
  const history = useHistory();

  const logout = useCallback(() => {
    fetch('http://localhost:3001/v1/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-IG': localStorage.getItem('x-auth-IG'),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        localStorage.clear();
        console.log('token removed');
        history.replace('/login');
      })
      .catch((e) => {
        console.log(e);
      });
  }, [history]);

  return (
    <header className="Header">
      <nav className="Navbar">
        <Link to="/" className="Logo">
          INSTAGRAM CLONE
        </Link>
        <div className="NavigationLinks">
          <Link to="/" className="NavIcon">
            {location.pathname === '/' ? <HomeFilledIcon /> : <HomeIcon />}
          </Link>
          <Link to="/" className="NavIcon">
            <NewPost />
          </Link>
          <Link to="/profile" className="NavIcon">
            <img className="profilePicture" id="userPictureNavbar" />
          </Link>
          <Link to="/" className="NavIcon" onClick={logout}>
            <NewPost />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
