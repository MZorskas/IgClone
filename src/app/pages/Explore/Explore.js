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

  // Selectors

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
