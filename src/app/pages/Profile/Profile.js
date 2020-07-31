import React, { useEffect } from 'react';
import './index.scss';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Modules
// import authentication from '../../../authentication';
import users from '../../../users';

//Pages
import NotFound from '../../pages/NotFound/NotFound';

// Components
import ProfileHeader from '../../components/ProfileHeader';
import ProfileNavigation from '../../components/ProfileNavigation';
import PostsContainer from '../../components/PostsContainer';
import SavedPostsContainer from '../../components/SavedPostsContainer';

function Profile() {
  const { username } = useParams();
  const location = useLocation();

  // Dispatch
  const dispatch = useDispatch();
  // Selectors
  // const activeUser = useSelector(authentication.selectors.getActiveUser);
  // const profileUser = useSelector((state) =>
  //   users.selectors.getProfileUser(state, username)
  // );
  // const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  // const token = useSelector(authentication.selectors.token);
  const error = useSelector(users.selectors.getUsersError);

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     dispatch(authentication.actions.loginUserWithStorage(token));
  //   }
  // }, [isAuthorized, authentication, token]);

  useEffect(() => {
    dispatch(users.actions.fetchSingleUser(username));
  }, [username, users]);

  return (
    <React.Fragment>
      <div className="Profile">
        {!!error ? (
          <NotFound />
        ) : (
          <>
            <ProfileHeader />
            <ProfileNavigation />
            <Switch>
              <Route exact path="/:username">
                <PostsContainer />
              </Route>
              <Route exact path="/:username/saved/">
                <SavedPostsContainer />
              </Route>
            </Switch>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Profile;
