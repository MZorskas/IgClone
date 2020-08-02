import React, { useEffect, useState, useRef, useCallback } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

//Modules
import feed from '../../../feed';
import authentication from '../../../authentication';
import users from '../../../users';

//Components
import UserBlock from '../UserBlock';
import UserCard from '../UserCard';

function UsersContainer({
  fetchAllUsers,
  fetchFollowers,
  fetchFollowing,
  closeModal,
  feed,
  length,
}) {
  const containerLength =
    length == 'long' ? 'UsersContainerLong' : 'UsersContainerShort';
  const { username } = useParams();
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const error = useSelector(users.selectors.getUsersError);
  const loading = useSelector(users.selectors.isUsersLoading);
  const token = useSelector(authentication.selectors.token);

  const profileUser = useSelector((state) =>
    users.selectors.getProfileUser(state, username)
  );
  // const { followers, following } = useSelector((state) =>
  //   users.selectors.getProfileUser(state, username)
  // );

  const followers = profileUser.followers;
  const following = profileUser.following;
  // console.log('UsersContainer', { followers, following });
  // console.log('UsersContainer profileUser', profileUser);

  const allUsersList = useSelector((state) =>
    users.selectors.getNotFollowedUsers(state, activeUser)
  );

  const followersList = useSelector((state) =>
    users.selectors.getFollowers(state, followers)
  );

  // const followingList = useSelector((state) =>
  //   users.selectors.getFollowingUsers(state, following)
  // );

  const followingList = useSelector((state) =>
    users.selectors.getAllFollowingUsers(state, activeUser)
  );

  useEffect(() => {
    if (fetchAllUsers) {
      dispatch(users.actions.fetchNotFollowedUsers(token));
    }

    if (fetchFollowers) {
      dispatch(users.actions.fetchFollowers(token, username));
    }

    if (fetchFollowing) {
      dispatch(users.actions.fetchFollowingUsers(token, username));
    }
  }, [users, token, username, fetchAllUsers, fetchFollowers, fetchFollowing]);

  // console.log('UsersContainer', {
  //   fetchAllUsers,
  //   fetchFollowers,
  //   fetchFollowing,
  // });^

  return (
    <React.Fragment>
      {feed ? (
        <div className={`UsersContainerFeed ${containerLength}`}>
          {fetchAllUsers &&
            !!allUsersList &&
            allUsersList.map((user) => {
              if (user.username !== activeUser.username)
                return (
                  <UserCard
                    key={user._id}
                    username={user.username}
                    placeHolder={user.profilePicture}
                    fullName={user.fullName}
                    userId={user._id}
                  ></UserCard>
                );
            })}
        </div>
      ) : (
        <div className={`UsersContainer ${containerLength}`}>
          {fetchFollowers &&
            !!followersList &&
            followersList.map((user) => {
              return (
                <UserBlock
                  key={user._id}
                  username={user.username}
                  placeHolder={user.profilePicture}
                  fullName={user.fullName}
                  userId={user._id}
                  closeModal={closeModal}
                  modal
                ></UserBlock>
              );
            })}
          {fetchAllUsers &&
            !!allUsersList &&
            allUsersList.map((user) => {
              if (user.username !== activeUser.username)
                return (
                  <UserBlock
                    key={user._id}
                    username={user.username}
                    placeHolder={user.profilePicture}
                    fullName={user.fullName}
                    closeModal={closeModal}
                    userId={user._id}
                  ></UserBlock>
                );
            })}
          {fetchFollowing &&
            !!followingList &&
            followingList.map((user) => {
              return (
                <UserBlock
                  key={user._id}
                  username={user.username}
                  placeHolder={user.profilePicture}
                  fullName={user.fullName}
                  userId={user._id}
                  closeModal={closeModal}
                  modal
                ></UserBlock>
              );
            })}
        </div>
      )}
    </React.Fragment>
  );
}

export default UsersContainer;
