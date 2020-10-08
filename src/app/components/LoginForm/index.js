import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';

//Modules
import authentication from '../../../authentication';

//Components
import Button from '../../components/Button';

function LoginForm() {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
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

    dispatch(authentication.actions.loginUser(body));
  };

  return (
    <React.Fragment>
      <div className="LoginFormBox">
        <form className="LoginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number, email or username"
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
          <Button
            type="submit"
            buttonStyle={
              !UniqueValue || !password
                ? 'btn--light--solid'
                : 'btn--blue--solid'
            }
            required={!UniqueValue || (!password && true)}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          {!!error && <p style={{ color: 'red' }}>{error}</p>}
          <span
            className="passwordVisibility"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </form>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;
