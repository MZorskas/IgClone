import React, { useEffect } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authentication from '../../../authentication';

function Explore() {
  // const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const history = useHistory();

  return (
    <React.Fragment>
      <div className="Home">
        <h1>EXPLORE</h1>
      </div>
    </React.Fragment>
  );
}

export default Explore;
