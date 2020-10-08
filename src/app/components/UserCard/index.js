import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { Link } from 'react-router-dom';

//Modules
import authentication from '../../../authentication';
import users from '../../../users';

//Components
import Button from '../Button';

function UserCard({ userId, username, fullName, placeHolder, closeModal }) {
  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const token = useSelector(authentication.selectors.token);
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const loading = useSelector(users.selectors.isToggleFollowUserLoading);
  const error = useSelector(users.selectors.getToggleFollowUserError);
  const { followers } = useSelector((state) =>
    users.selectors.getUserById(state, userId)
  );

  const toggleUserFollow = () => {
    dispatch(users.actions.toggleFollowUser(userId, token));
  };

  return (
    <div className="UserCard">
      <div className="AvatarContainer">
        <Link to={`/${username}`} onClick={closeModal}>
          <img src={placeHolder} alt="User Image" />
        </Link>
      </div>
      <div className="UserInfoContainer">
        <Link className="UserUsername" to={`/${username}`} onClick={closeModal}>
          {username}
        </Link>
        <span className="UserFullName">{fullName}</span>
      </div>
      {activeUser.username === username ? null : followers.includes(
          activeUser._id
        ) ? (
        <>
          <Button
            onClick={toggleUserFollow}
            buttonStyle="btn--secondary--outline"
          >
            Following
          </Button>
        </>
      ) : (
        <Button onClick={toggleUserFollow} buttonStyle="btn--primary--solid">
          Follow
        </Button>
      )}
    </div>
  );
}

export default UserCard;
