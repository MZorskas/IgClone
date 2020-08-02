import React, { useEffect, useD } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, useLocation, Link } from 'react-router-dom';

//Components
import ExploreGallery from '../../components/ExploreGallery';

import UsersContainer from '../../components/UsersContainer';
function Explore() {
  return (
    <React.Fragment>
      <div className="Explore">
        <Switch>
          <Route exact path="/explore">
            <h1>EXPLORE</h1>
            <ExploreGallery />
          </Route>
          <Route exact path="/explore/people/suggested">
            <div className="Suggested">
              <h4>Suggested</h4>
              <UsersContainer length="long" fetchAllUsers />
            </div>
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Explore;
