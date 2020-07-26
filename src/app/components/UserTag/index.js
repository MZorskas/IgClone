import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function UserTag({
  username,
  fullName,
  placeHolder,
  size,
  setDisplay,
  setSearchInput,
}) {
  const SIZES = ['Avatar--small', 'Avatar--medium', 'Avatar--large'];
  const avatarSize = SIZES.includes(size) ? size : 'Avatar--small';

  const handleOnClick = () => {
    setDisplay(false);
    setSearchInput('');
  };

  return (
    <div className="UserTag">
      <div className="UserAvatar">
        <Link
          to={`/${username}`}
          {...(setDisplay &&
            setSearchInput && {
              onClick: handleOnClick,
            })}
        >
          <img
            className={`Avatar ${avatarSize}`}
            src={placeHolder}
            alt="User Image"
          />
        </Link>
      </div>
      <div className="UserInfo">
        <Link
          className="Username"
          to={`/${username}`}
          {...(setDisplay &&
            setSearchInput && {
              onClick: handleOnClick,
            })}
        >
          {username}
        </Link>
        <span className="FullName">{fullName}</span>
      </div>
    </div>
  );
}

export default UserTag;
