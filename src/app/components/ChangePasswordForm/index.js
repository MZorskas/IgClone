import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.scss';

// Components
import Button from '../Button';

// Modules
import authentication from '../../../authentication';

function ChangePasswordForm() {
  // Dispatch
  const dispatch = useDispatch();

  // // Selectors
  const isAuthorized = useSelector(authentication.selectors.isAuthorized);
  const token = useSelector(authentication.selectors.token);
  const error = useSelector(authentication.selectors.getChangePasswordError);
  const loading = useSelector(authentication.selectors.isChangePasswordLoading);
  const { username, profilePicture } = useSelector(
    authentication.selectors.getActiveUser
  );
  const success = useSelector(
    authentication.selectors.isChangePasswordSuccessful
  );

  // Change password State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    setValidationError('');
    let body = {};
    e.preventDefault();

    if (!oldPassword || !newPassword || !repeatNewPassword) {
      return (
        setValidationError('Please fill in required fields'),
        console.log('Please fill in required fields')
      );
    }
    if (newPassword.length < 6) {
      return (
        setValidationError('New password is too short. Try again'),
        console.log('New password is too short. Try again')
      );
    }
    if (newPassword !== repeatNewPassword) {
      return (
        setValidationError("The passwords didn't match. Try again"),
        console.log("The passwords didn't match. Try again")
      );
    }
    body.oldPassword = oldPassword;
    body.newPassword = newPassword;
    body.repeatNewPassword = repeatNewPassword;
    dispatch(authentication.actions.changePassword(body, token));
  };

  return (
    <div className="ChangePassword">
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
            <span>Old Password</span>
          </div>
          <input
            type="password"
            value={oldPassword}
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
            placeholder="Old Password"
            required
          />
        </div>
        <div className="InputSection">
          <div className="FieldValue">
            <span>New Password</span>
          </div>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
            autoFocus
            required
          ></input>
        </div>
        <div className="InputSection">
          <div className="FieldValue">
            <span>Confirm New Password</span>
          </div>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={repeatNewPassword}
            onChange={(event) => {
              setRepeatNewPassword(event.target.value);
            }}
            autoFocus
            required
          ></input>
        </div>
        <div className="ButtonSection">
          <Button
            type="submit"
            buttonStyle={
              !oldPassword || !newPassword || !repeatNewPassword
                ? 'btn--light--solid'
                : 'btn--blue--solid'
            }
          >
            {loading ? 'Loading...' : 'Change Password'}
          </Button>
        </div>
      </form>
      {validationError && (
        <p style={{ color: 'red', 'margin-left': '235px' }}>
          {validationError}
        </p>
      )}
      {error && <p style={{ color: 'red', marginLeft: '235px' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green', marginLeft: '235px' }}>{success}</p>
      )}
    </div>
  );
}
export default ChangePasswordForm;
