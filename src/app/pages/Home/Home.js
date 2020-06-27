import React, { useEffect } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authentication from '../../../authentication';

function Home() {
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);

  // const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const history = useHistory();

  useEffect(() => {
    if (!isAuthorized) {
      history.replace('/login');
    }
  }, [isAuthorized, history]);

  return (
    <React.Fragment>
      <div className="Home">
        <h1>HOME</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
