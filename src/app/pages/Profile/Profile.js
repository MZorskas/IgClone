import React, { useEffect, useState } from 'react';
import './index.scss';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import authentication from '../../../authentication';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileNavigation from '../../components/ProfileNavigation';
import PostsContainer from '../../components/PostsContainer';
import users from '../../../users';
import feed from '../../../feed';
import NotFound from '../../pages/NotFound/NotFound';

function Profile() {
  const { username } = useParams();
  const location = useLocation();

  // Dispatch
  const dispatch = useDispatch();
  const fetchUser = bindActionCreators(users.actions.fetchSingleUser, dispatch);
  // Selectors
  const activeUser = useSelector(authentication.selectors.getActiveUser);
  const user = useSelector((state) =>
    users.selectors.isUserFetched(state, username)
  );
  const error = useSelector(users.selectors.getSingleUserError);
  const [profileUser, setprofileUser] = useState({});

  // useEffect(() => {
  //   if (error) {
  //     fetchUser(username);
  //   }
  // }, []);

  useEffect(() => {
    if (username === activeUser.username) {
      setprofileUser(activeUser);
    } else if (user) {
      setprofileUser(user);
    } else if (!error) {
      fetchUser(username);
    }
  }, [user, fetchUser, username, error, activeUser]);

  console.log('Profile page username', username);
  console.log('Profile page activeUser', activeUser);
  console.log('Profile page profileUser', profileUser);
  console.log('Profile page user', user);
  // console.log('Profile page profileUser', profileUser);

  return (
    <React.Fragment>
      <div className="Profile">
        {!!error ? (
          <NotFound />
        ) : (
          <>
            <ProfileHeader
              username={profileUser.username}
              fullName={profileUser.fullName}
              following={profileUser.following}
              followers={profileUser.followers}
              profilePicture={profileUser.profilePicture}
            />
            <ProfileNavigation username={username} />
            <Switch>
              <Route exact path="/:username">
                <PostsContainer />
              </Route>
              <Route exact path="/:username/saved/">
                <h1>Saved Gallery</h1>
              </Route>
            </Switch>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Profile;
