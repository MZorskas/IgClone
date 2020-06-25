import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { emailRegex, fullNameRegEx, usernameRegEx } from '../../utils/regex';

function Register() {
  const [token, setToken] = useState(localStorage.getItem('x-auth-IG'));
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // const emailRegEx = new RegExp('@"^([w.-]+)@([w-]+)((.(w){2,3})+)$"');
    // const phoneNumberRegEx = new RegExp(
    //   '/[-+]?s*[0-9]{1,3}(.[0-9]{3})*,[0-9]+/'
    // );

    if (!email || !username || !fullName || !password || !repeatPassword) {
      return (
        setError('Please fill in required fields'),
        console.log('Please fill in required fields')
      );
    }

    if (emailRegex.exec(email) === null) {
      return (
        setError('Invalid email. Try again'),
        console.log('Invalid email. Try again')
      );
    }

    if (usernameRegEx.exec(username) === null) {
      return (
        setError('Invalid username. Try again'),
        console.log('Invalid username. Try again')
      );
    }

    if (fullNameRegEx.exec(fullName) === null) {
      return (
        setError('Invalid full name. Try again'),
        console.log('Invalid full name. Try again')
      );
    }
    if (password !== repeatPassword) {
      return (
        setError("The passwords didn't match. Try again"),
        console.log("The passwords didn't match. Try again")
      );
    }

    const body = {
      email: email,
      fullName: fullName,
      username: username,
      password: password,
    };

    // if (emailRegEx.exec(id) != null) {
    //   console.log('Email: ' + id);
    //   body.email = id;
    // } else if (phoneNumberRegEx.exec(id) != null) {
    //   //Check if phone number

    //   console.log('PhoneNumber: ' + id);
    //   body.phoneNumber = id;
    // } else {
    //   return console.log('enter valid Mobile Number or Email');
    // }

    register(body);
  };

  useEffect(() => {
    if (localStorage.getItem('x-auth-IG')) {
      history.replace('/');
    }
  }, [token]);

  const register = useCallback(
    (body) => {
      fetch('http://localhost:3001/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          localStorage.setItem('x-auth-IG', response.headers.get('x-auth-IG'));
          return response.json();
        })
        .then((response) => {
          //load user to state
          console.log('registerFetch', response);
          history.replace('/');
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [history]
  );

  return (
    <React.Fragment>
      <div className="Register">
        <div className="RegisterBox">
          <form className="RegisterForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              autoFocus
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              autoFocus
              required
            />
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(event) => {
                setFullName(event.target.value);
              }}
              autoFocus
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(event) => {
                setRepeatPassword(event.target.value);
              }}
            />

            <input type="submit" value="Register" className="btn" />
          </form>
        </div>
        <div className="LinkBox">
          <p>
            Have an account?
            <Link className="link" to="/login">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
