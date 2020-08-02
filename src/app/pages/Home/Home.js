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
import FooterNav from '../../components/FooterNav';

function Home() {
  // Selectors
  const { username, profilePicture, fullName } = useSelector(
    authentication.selectors.getActiveUser
  );
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const history = useHistory();

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
          <FooterNav HomeNav />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
