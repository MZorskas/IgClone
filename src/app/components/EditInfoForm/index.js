import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';
import Loader from '../../images/Loader.svg';

// Components
import Button from '../Button';

// Modules
import authentication from '../../../authentication';

// Regular expressions
import { fullNameRegex } from '../../utils/regex';

function EditInfoForm() {
  // Dispatch
  const dispatch = useDispatch();

  // // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);
  const error = useSelector(authentication.selectors.getEditInfoError);
  const loading = useSelector(authentication.selectors.isEditInfoLoading);
  const { username, profilePicture, fullName } = useSelector(
    authentication.selectors.getActiveUser
  );
  const success = useSelector(authentication.selectors.isEditInfoSuccessful);

  // Change info State
  const [newFullName, setNewFullName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');
    let body = {};

    if (!!newBio) {
      body.bio = newBio;
    }

    if (!!newFullName) {
      if (fullNameRegex.exec(newFullName) === null) {
        return (
          setValidationError('Invalid full name. Try again'),
          console.log('Invalid full name. Try again')
        );
      }
      body.fullName = newFullName;
    }

    dispatch(authentication.actions.editInfo(body, token));
  };

  return (
    <div className="EditInfo">
      <div className="UserSection">
        <div className="UserAvatar">
          <Link to={`/${username}`}>
            <img
              className={`Avatar Avatar--medium`}
              src={profilePicture}
              alt="User Image"
            />
          </Link>
        </div>
        <div className="Username">{username}</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="InputSection">
          <div className="FieldValue">
            <span>Name</span>
          </div>
          <input
            type="text"
            placeholder={fullName}
            value={newFullName}
            onChange={(event) => {
              setNewFullName(event.target.value);
            }}
          ></input>
        </div>
        <div className="TextAreaSection">
          <div className="FieldValue">
            <span>Bio</span>
          </div>

          <textarea
            className="BioInput"
            maxLength="150"
            value={newBio}
            onChange={(e) => {
              setNewBio(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="ButtonSection">
          <Button
            type="submit"
            buttonStyle={
              !newBio && !newFullName ? 'btn--light--solid' : 'btn--blue--solid'
            }
          >
            {loading ? <img src={Loader} alt="loading..." /> : 'Submit'}
          </Button>
        </div>
      </form>
      {validationError && <p style={{ color: 'red' }}>{validationError}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
}
export default EditInfoForm;
