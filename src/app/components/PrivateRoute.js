import React from 'react';
import {
  Route,
  Redirect,
  useLocation,
  useHistory,
  useParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import authentication from '../../authentication';
import { getActiveUser } from '../../authentication/selectors';

import NotFound from '../pages/NotFound/NotFound';

function PrivateRoute(props) {
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const { username } = useSelector(authentication.selectors.getActiveUser);
  const location = useLocation();

  console.log('PrivateRoute', isAuthorized);
  console.log('PrivateRoute location', location.pathname);
  console.log('PrivateRoute props', props.path);

  if (
    props.path === '/:username/saved/' &&
    location.pathname !== `/${username}/saved`
  ) {
    return <NotFound />;
  }

  if (isAuthorized) {
    // console.log('Proceed');
    return <Route {...props} />;
  }

  // if (location.pathname === `/${username}/saved`) {
  //   return <Route {...props} />;
  // }

  console.log('Will redirect');

  return (
    <Redirect to={{ pathname: '/login', state: { referrer: location } }} />
  );
}

export default PrivateRoute;
