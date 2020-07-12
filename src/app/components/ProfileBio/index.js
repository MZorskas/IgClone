import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import authentication from '../../../authentication';
function ProfileBio({ fullName }) {
  const location = useLocation();

  // Selectors
  const { bio } = useSelector(authentication.selectors.getActiveUser);

  return (
    <div className="ProfileBio">
      <span id="ProfileFullName">{fullName} </span>
      {bio && <p>{bio}</p>}
    </div>
  );
}

export default ProfileBio;
