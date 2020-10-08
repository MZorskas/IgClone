import React, { useEffect } from 'react';
import './index.scss';

//Components
import Feed from '../../components/Feed';
import ActiveUserContainer from '../../components/ActiveUserContainer';

function Home() {
  return (
    <React.Fragment>
      <div className="Home">
        <Feed />
        <ActiveUserContainer />
        {/* <div className="ActiveUserContainer">
          <UserTag
            username={username}
            fullName={fullName}
            placeHolder={profilePicture}
            size={'Avatar--large'}
          />
          <Suggestions />
          <FooterNav HomeNav />
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default Home;
