import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';

function Login() {
  const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  console.log('login', { password, email });
  const history = useHistory();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return console.log('Please fill in both the fields');
    }

    login(email, password);
  };

  useEffect(() => {
    if (token) {
      history.replace('/');
    }
  }, [token]);

  const login = useCallback(() => {
    fetch('http://localhost:3001/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw console.log('Wrong credentials!');
        }
        console.log(response.headers.get('x-auth-IG'));
        setToken(response.headers.get('x-auth-IG'));
        localStorage.setItem('x-auth-IG', response.headers.get('x-auth-IG'));
        return response.json();
      })
      .then((response) => {
        console.log('loginFetch', response);
        history.replace('/');
      })
      .catch((e) => {
        console.log(e);
      });
  }, [email, password]);

  return (
    <React.Fragment>
      <div className="Login">
        <div className="LoginBox">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
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
            <input type="submit" value="Log in" className="btn" />
            <span
              className="passwordVisibility"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
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
