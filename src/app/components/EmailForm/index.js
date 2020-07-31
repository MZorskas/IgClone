import React, { useState } from 'react';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../images/Loader.svg';

//State Modules
import authentication from '../../../authentication';

// Regular expressions
import { emailRegex } from '../../utils/regex';

//Components
import Button from '../Button';

function EmailForm() {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const error = useSelector(authentication.selectors.getAddEmailError);
  const loading = useSelector(authentication.selectors.isAddEmailLoading);

  // State
  const [email, setEmail] = useState(null);
  const [validationError, setValidationError] = useState(error);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailRegex.exec(email) === null) {
      return (
        setValidationError('Invalid Email. Try again'),
        console.log('Invalid Email. Try again')
      );
    }
    dispatch(authentication.actions.addEmail(token, email));
  };

  return (
    <div className="EmailFormBox">
      <h3>Add Email To Get Back Into IG Clone</h3>
      <form className="EmailForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          defaultValue={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          autoFocus
          required
        />
        <Button
          type="submit"
          buttonStyle={!email ? 'btn--light--solid' : 'btn--blue--solid'}
          required={!email}
        >
          {loading ? <img src={Loader} alt="loading..." /> : 'Confirm'}
        </Button>

        {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default EmailForm;
