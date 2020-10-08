import React from 'react';
import './index.scss';
import { useSelector } from 'react-redux';

//Modules
import authentication from '../../../authentication';

//Components
import Suggestions from '../../components/Suggestions';
import UserTag from '../../components/UserTag';
import FooterNav from '../../components/FooterNav';

function ActiveUserContainer() {
  // Selectors
  const { username, profilePicture, fullName } = useSelector(
    authentication.selectors.getActiveUser
  );

  return (
    <div className="ActiveUserContainer">
      <UserTag
        username={username}
        fullName={fullName}
        placeHolder={profilePicture}
        size={'Avatar--large'}
      />
      <Suggestions />
      <FooterNav HomeNav />
    </div>
  );
}

export default ActiveUserContainer;
