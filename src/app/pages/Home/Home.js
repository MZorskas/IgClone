import React, { useEffect } from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';

function Home() {
  // Dispatch
  const dispatch = useDispatch();
  // const loginUserWithStorage = useDispatch(
  //   authentication.actions.loginUserWithStorage,
  //   dispatch
  // );
  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);
  // const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const history = useHistory();
  console.log('HOME', isAuthorized);

  useEffect(() => {
    if (!token) {
      history.replace('/login');
    } else if (!isAuthorized) {
      dispatch(authentication.actions.loginUserWithStorage(token));
    }
  }, [isAuthorized, authentication, token, history]);

  return (
    <React.Fragment>
      <div className="Home">
        <h1>HOME</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
