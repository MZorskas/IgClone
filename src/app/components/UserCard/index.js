import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { Link } from 'react-router-dom';

//Modules
import authentication from '../../../authentication';
import users from '../../../users';

//Components
import Button from '../../components/Button';

function UserCard({ userId, username, fullName, placeHolder, modal }) {
  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  const token = useSelector(authentication.selectors.token);
  const activeUser = useSelector(authentication.selectors.getActiveUser);

  const { followers } = useSelector((state) =>
    users.selectors.getUserById(state, userId)
  );

  const toggleUserFollow = () => {
    dispatch(users.actions.toggleFollowUser(userId, token));
  };

  return (
    <div className={`UserCard ${modal ? 'UserCard--modal' : null}`}>
      <div className="AvatarContainer">
        <Link to="/">
          <img src={placeHolder} alt="User Image" />
        </Link>
      </div>
      <div className="UserInfoContainer">
        <Link className="UserUsername" to="/">
          {username}
        </Link>
        <span className="UserFullName">{fullName}</span>
      </div>
      {followers.includes(activeUser._id) ? (
        <>
          <Button onClick={toggleUserFollow} buttonStyle="btn--white--outline">
            Unfollow
          </Button>
        </>
      ) : (
        <Button onClick={toggleUserFollow} buttonStyle="btn--blue--outline">
          Follow
        </Button>
      )}
    </div>
  );
}

export default UserCard;
