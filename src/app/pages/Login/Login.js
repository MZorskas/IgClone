import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';

//Modules
import authentication from '../../../authentication';

//Components
import LoginForm from '../../components/LoginForm';
import LinkBox from '../../components/LinkBox';

function Login() {
  const history = useHistory();

  // // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const storageLoading = useSelector(authentication.selectors.isStorageLoading);

  useEffect(() => {
    if (isAuthorized) {
      history.replace(
        history.location.state ? history.location.state.referrer.pathname : '/'
      );
    }
  }, [isAuthorized, history]);

  return (
    <React.Fragment>
      {!storageLoading && (
        <div className="Login">
          <LoginForm />
          <LinkBox />
        </div>
      )}
    </React.Fragment>
  );
}

export default Login;
