import React from 'react';
import './index.scss';
import { Link, useLocation, useParams } from 'react-router-dom';
import {
  SavedIcon12,
  PostsIcon,
  SavedIconActive12,
  PostsIconActive,
} from '../icons';
import { useSelector } from 'react-redux';

//Modules
import authentication from '../../../authentication';

function ProfileNavigation() {
  const location = useLocation();
  const { username } = useParams();
  // console.log('ProfileNavigation', location);

  //Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  return (
    <div className="ProfileNavigation">
      <Link
        className={
          location.pathname === `/${username}` ? 'Tab Tab--Active' : 'Tab'
        }
        to={{ pathname: `/${username}` }}
      >
        {location.pathname === `/${username}` ? (
          <PostsIconActive />
        ) : (
          <PostsIcon />
        )}
        Posts
      </Link>
      {username === activeUser.username && (
        <Link
          className={
            location.pathname === `/${username}/saved`
              ? 'Tab Tab--Active'
              : 'Tab'
          }
          to={{ pathname: `/${username}/saved` }}
        >
          {location.pathname === `/${username}` ? (
            <SavedIconActive12 />
          ) : (
            <SavedIcon12 />
          )}
          Saved
        </Link>
      )}
    </div>
  );
}

export default ProfileNavigation;
