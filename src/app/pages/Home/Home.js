import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';

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
      <div className="Home">
        <h1>HOME</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
