import React, { useEffect, useD } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Modules
import authentication from '../../../authentication';

//Components
import ExploreGallery from '../../components/ExploreGallery';

function Explore() {
  const history = useHistory();

  //Dispatch
  const dispatch = useDispatch();

  // //Selectors
  // const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  // const token = useSelector(authentication.selectors.token);

  // useEffect(() => {
  //   if (!isAuthorized) {
  //     dispatch(authentication.actions.loginUserWithStorage(token));
  //   }
  // }, [isAuthorized, authentication, token]);

  return (
    <React.Fragment>
      <div className="Explore">
        <h1>EXPLORE</h1>
        <ExploreGallery />
      </div>
    </React.Fragment>
  );
}

export default Explore;
