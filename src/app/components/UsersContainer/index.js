import React, { useEffect, useState, useRef, useCallback } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

//Modules
import feed from '../../../feed';
import authentication from '../../../authentication';
import users from '../../../users';

//Components
import UserCard from '../UserCard';

function UsersContainer({ fetchAllUsers, fetchFollowers, fetchFollowing }) {
  const { username } = useParams();
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const error = useSelector(feed.selectors.getFeedError);
  const loading = useSelector(feed.selectors.isFeedLoading);
  const token = useSelector(authentication.selectors.token);

  const { followers, following } = useSelector((state) =>
    users.selectors.getProfileUser(state, username)
  );

  const allUsersList = useSelector((state) =>
    users.selectors.getNotFollowedUsers(state, activeUser)
  );

  const followersList = useSelector((state) =>
    users.selectors.getFollowers(state, followers)
  );

  const followingList = useSelector((state) =>
    users.selectors.getFollowingUsers(state, following)
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
  }, [feed, token, username, fetchAllUsers, fetchFollowers, fetchFollowing]);

  console.log('UsersContainer', {
    fetchAllUsers,
    fetchFollowers,
    fetchFollowing,
  });
  return (
    <div className="FollowersContainer">
      {fetchFollowers &&
        !!followersList &&
        followersList.map((user) => {
          return (
            <UserCard
              key={user._id}
              username={user.username}
              placeHolder={user.profilePicture}
              fullName={user.fullName}
              userId={user._id}
              modal
            ></UserCard>
          );
        })}
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
      {fetchFollowing &&
        !!followingList &&
        followingList.map((user) => {
          return (
            <UserCard
              key={user._id}
              username={user.username}
              placeHolder={user.profilePicture}
              fullName={user.fullName}
              userId={user._id}
              modal
            ></UserCard>
          );
        })}
    </div>
  );
}

export default UsersContainer;
