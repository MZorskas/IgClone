import React from 'react';
import './index.scss';
import { bindActionCreators } from 'redux';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authentication from '../../../authentication';

function ProfileBio({ fullName }) {
  const location = useLocation();

  return (
    <div className="ProfileBio">
      <span id="ProfileFullName">{fullName} </span>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elitLorem ipsum
        dolor sitLorem ipsum dolor sit, amet consectetur adipisicing elit
      </p>
    </div>
  );
}

export default ProfileBio;
