import React, { useEffect, useD } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';
import ExploreGallery from '../../components/ExploreGallery';

function Explore() {
  // const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const history = useHistory();

  //Dispatch
  const dispatch = useDispatch();

  //Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);

  useEffect(() => {
    if (!isAuthorized) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token]);

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
