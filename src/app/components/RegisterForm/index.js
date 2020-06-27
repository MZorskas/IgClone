import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// Regular expressions
import { emailRegex, fullNameRegEx, usernameRegEx } from '../../utils/regex';

function RegisterForm({ nextStep, setBody, body, error, handleSubmit }) {
  // RegisterForm state
  const [email, setEmail] = useState(body.email);
  const [username, setUsername] = useState(body.username);
  const [fullName, setFullName] = useState(body.fullName);
  const [password, setPassword] = useState(body.password);
  const [validationError, setValidationError] = useState(error);
  const [repeatPassword, setRepeatPassword] = useState(body.repeatPassword);

  const updateForm = (e) => {
    e.preventDefault();

    // Input validation
    if (!email || !username || !fullName || !password || !repeatPassword) {
      return (
        setValidationError('Please fill in required fields'),
        console.log('Please fill in required fields')
      );
    }

    if (emailRegex.exec(email) === null) {
      return (
        setValidationError('Invalid email. Try again'),
        console.log('Invalid email. Try again')
      );
    }

    if (usernameRegEx.exec(username) === null) {
      return (
        setValidationError('Invalid username. Try again'),
        console.log('Invalid username. Try again')
      );
    }

    if (fullNameRegEx.exec(fullName) === null) {
      return (
        setValidationError('Invalid full name. Try again'),
        console.log('Invalid full name. Try again')
      );
    }

    if (password.length < 6) {
      return (
        setValidationError('Password too short. Try again'),
        console.log('Password too short. Try again')
      );
    }

    if (password !== repeatPassword) {
      return (
        setValidationError("The passwords didn't match. Try again"),
        console.log("The passwords didn't match. Try again")
      );
    }

    // Request body state
    setBody({
      email: email,
      fullName: fullName,
      username: username,
      password: password,
      repeatPassword: repeatPassword,
      dateOfBirth: body.dateOfBirth,
    });

    if (body.dateOfBirth) return handleSubmit();

    nextStep();
  };

  return (
    <React.Fragment>
      <div className="RegisterFormBox">
        <form className="RegisterForm" onSubmit={updateForm}>
          <input
            type="text"
            placeholder="Phone number or email"
            defaultValue={email}
            onChange={(event) => {
              setBody({ ...body, email: event.target.value });
              setEmail(event.target.value);
            }}
            autoFocus
            required
          />
          <input
            type="text"
            placeholder="Username"
            defaultValue={username}
            onChange={(event) => {
              setBody({ ...body, username: event.target.value });
              setUsername(event.target.value);
            }}
            autoFocus
            required
          />
          <input
            type="text"
            placeholder="Full name"
            defaultValue={fullName}
            onChange={(event) => {
              setBody({ ...body, fullName: event.target.value });
              setFullName(event.target.value);
            }}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="on"
            defaultValue={password}
            onChange={(event) => {
              setBody({ ...body, password: event.target.value });
              setPassword(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Repeat Password"
            defaultValue={repeatPassword}
            onChange={(event) => {
              setRepeatPassword(event.target.value);
            }}
          />
          <button
            type="submit"
            className={
              !email || !username || !fullName || !password || !repeatPassword
                ? 'btn btn-light'
                : 'btn'
            }
          >
            Next
          </button>
          {validationError && <p style={{ color: 'red' }}>{error}</p>}
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
    </React.Fragment>
  );
}

export default RegisterForm;
