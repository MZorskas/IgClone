import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../images/Loader.svg';

//State Modules
import authentication from '../../../authentication';

// Regular expressions
import { phoneNumberRegex } from '../../utils/regex';

//Components
import Button from '../Button';

function PhoneNumberForm() {
  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const token = useSelector(authentication.selectors.token);
  const error = useSelector(authentication.selectors.getAddPhoneNumberError);
  const loading = useSelector(authentication.selectors.isAddPhoneNumberLoading);

  // State
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [validationError, setValidationError] = useState(error);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNumberRegex.exec(phoneNumber) === null) {
      return (
        setValidationError('Invalid Phone Number. Try again'),
        console.log('Invalid Phone Number. Try again')
      );
    }
    dispatch(authentication.actions.addPhoneNumber(token, phoneNumber));
  };

  return (
    <div className="PhoneNumberFormBox">
      <h3>Add Phone Number To Get Back Into IG Clone</h3>
      <form className="PhoneNumberForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone number"
          defaultValue={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
          autoFocus
          required
        />
        <Button
          type="submit"
          buttonStyle={!phoneNumber ? 'btn--light--solid' : 'btn--blue--solid'}
          required={!phoneNumber}
        >
          {loading ? <img src={Loader} alt="loading..." /> : 'Confirm'}
        </Button>

        {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default PhoneNumberForm;
