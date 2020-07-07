import React, { useEffect } from 'react';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Modules
import authentication from '../../../authentication';

//Components
import Feed from '../../components/Feed';
import Suggestions from '../../components/Suggestions';
import UserTag from '../../components/UserTag';

function Home() {
  // Dispatch
  const dispatch = useDispatch();
  const { username, profilePicture, fullName } = useSelector(
    authentication.selectors.getActiveUser
  );
  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);
  const history = useHistory();
  console.log('HOME', isAuthorized);

  useEffect(() => {
    if (!token) {
      history.replace('/login');
    } else if (!isAuthorized) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token, history]);

  return (
    <React.Fragment>
      <div className="Home">
        <Feed />
        <div className="ActiveUser">
          <UserTag
            username={username}
            fullName={fullName}
            placeHolder={profilePicture}
            size={'Avatar--large'}
          />
          <Suggestions />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
