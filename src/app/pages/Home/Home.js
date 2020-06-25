import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';

//Components
import FeedContainer from '../../components/FeedContainer';

function Home() {
  const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.replace('/login');
    }
  }, [token]);

  return (
    <React.Fragment>
      <div className="Home">{/* <FeedContainer /> */}</div>
    </React.Fragment>
  );
}

export default Home;
