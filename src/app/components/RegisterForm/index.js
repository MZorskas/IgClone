import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

// Regular expressions
import {
  emailRegex,
  fullNameRegex,
  usernameRegex,
  phoneNumberRegex,
} from '../../utils/regex';

//Components
import Button from '../Button';

function RegisterForm({ nextStep, setBody, body, error, handleSubmit }) {
  // RegisterForm state
  const [uniqueValue, setUniqueValue] = useState(
    body.email ? body.email : body.phoneNumber
  );
  const [username, setUsername] = useState(body.username);
  const [fullName, setFullName] = useState(body.fullName);
  const [password, setPassword] = useState(body.password);
  const [validationError, setValidationError] = useState(error);
  const [repeatPassword, setRepeatPassword] = useState(body.repeatPassword);

  const updateForm = (e) => {
    e.preventDefault();

    // Input validation
    if (
      !uniqueValue ||
      !username ||
      !fullName ||
      !password ||
      !repeatPassword
    ) {
      return (
        setValidationError('Please fill in required fields'),
        console.log('Please fill in required fields')
      );
    }

    if (uniqueValue.includes('@')) {
      if (emailRegex.exec(uniqueValue) === null) {
        return (
          setValidationError('Invalid email. Try again'),
          console.log('Invalid email. Try again')
        );
      }
      setBody({ ...body, email: uniqueValue });
    } else {
      if (phoneNumberRegex.exec(uniqueValue) === null) {
        return (
          setValidationError('Invalid Phone Number. Try again'),
          console.log('Invalid Phone Number. Try again')
        );
      }
      setBody({ ...body, phoneNumber: uniqueValue });
    }

    if (usernameRegex.exec(username) === null) {
      return (
        setValidationError('Invalid username. Try again'),
        console.log('Invalid username. Try again')
      );
    }

    if (fullNameRegex.exec(fullName) === null) {
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
    if (body.dateOfBirth) return handleSubmit(e);
    nextStep();
  };

  return (
    <React.Fragment>
      <div className="RegisterFormBox">
        <form className="RegisterForm" onSubmit={updateForm}>
          <input
            type="text"
            placeholder="Phone number or email"
            defaultValue={uniqueValue}
            onChange={(event) => {
              setUniqueValue(event.target.value);
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
              setBody({ ...body, repeatPassword: event.target.value });
              setRepeatPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            buttonStyle={
              !uniqueValue ||
              !username ||
              !fullName ||
              !password ||
              !repeatPassword
                ? 'btn--light--solid'
                : 'btn--blue--solid'
            }
            required={
              !uniqueValue ||
              !username ||
              !fullName ||
              !password ||
              !repeatPassword
            }
          >
            Next
          </Button>

          {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
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
