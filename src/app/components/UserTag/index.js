import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function UserTag({ username, fullName, placeHolder, size }) {
  const SIZES = ['Avatar--small', 'Avatar--medium', 'Avatar--large'];
  const avatarSize = SIZES.includes(size) ? size : 'Avatar--small';

  return (
    <div className="UserTag">
      <div className="UserAvatar">
        <Link to={`/${username}`}>
          <img
            className={`Avatar ${avatarSize}`}
            src={placeHolder}
            alt="User Image"
          />
        </Link>
      </div>
      <div className="UserInfo">
        <Link className="Username" to={`/${username}`}>
          {username}
        </Link>
        <span className="FullName">{fullName}</span>
      </div>
    </div>
  );
}

export default UserTag;
