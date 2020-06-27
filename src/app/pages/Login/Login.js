import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

// Redux
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

//State Modules
import authentication from '../../../authentication';

function Login() {
  const history = useHistory();

  // Dispatch
  const dispatch = useDispatch();
  const loginUser = bindActionCreators(
    authentication.actions.loginUser,
    dispatch
  );

  // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const error = useSelector(authentication.selectors.getLoginError);
  const loading = useSelector(authentication.selectors.isLoginLoading);

  // Login State
  const [UniqueValue, setUniqueValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    let body = {};
    e.preventDefault();
    if (!UniqueValue || !password) {
      return console.log('Please fill in both the fields');
    }

    if (UniqueValue.includes('@')) {
      console.log('this is email ' + UniqueValue);
      body.email = UniqueValue;
      body.password = password;
    } else if (parseFloat(UniqueValue)) {
      console.log('this is phoneNumer ' + UniqueValue);
      body.phoneNumber = UniqueValue;
      body.password = password;
    } else {
      console.log('this is username ' + UniqueValue);
      body.username = UniqueValue;
      body.password = password;
    }

    loginUser(body);
  };

  useEffect(() => {
    if (isAuthorized) {
      history.replace(
        history.location.state ? history.location.state.referrer.pathname : '/'
      );
    }
  }, [isAuthorized, history]);

  return (
    <React.Fragment>
      <div className="Login">
        <div className="LoginBox">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email, phone number or username"
              value={UniqueValue}
              onChange={(event) => {
                setUniqueValue(event.target.value);
              }}
              autoFocus
              required
            />

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <button
              type="submit"
              className={!UniqueValue || !password ? 'btn btn-light' : 'btn'}
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
            <span
              className="passwordVisibility"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
            {!!error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
        <div className="LinkBox">
          <p>
            Don't have an account?{' '}
            <Link className="link" to="/register">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
