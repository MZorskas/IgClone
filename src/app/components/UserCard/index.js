import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { Link } from 'react-router-dom';
import Loader from '../../images/Loader.svg';

//Modules
import authentication from '../../../authentication';
import users from '../../../users';

//Components
import Button from '../../components/Button';

function UserCard({
  userId,
  username,
  fullName,
  placeHolder,
  modal,
  closeModal,
}) {
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

  // console.log("UserCard", closeModal);
  return (
    <div className={`UserCard ${modal ? 'UserCard--modal' : ''}`}>
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
          <Button onClick={toggleUserFollow} buttonStyle="btn--white--outline">
            {loading ? <img src={Loader} alt="loading..." /> : 'Following'}
          </Button>
        </>
      ) : (
        <Button onClick={toggleUserFollow} buttonStyle="btn--blue--outline">
          {loading ? <img src={Loader} alt="loading..." /> : 'Follow'}
        </Button>
      )}
    </div>
  );
}

export default UserCard;
