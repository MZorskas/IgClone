import React, { useEffect, useD } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//Components
import ExploreGallery from '../../components/ExploreGallery';

function Explore() {
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
