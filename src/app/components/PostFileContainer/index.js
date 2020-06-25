import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import TestPicture from '../../images/3resized.jpg';

function PostFileContainer() {
  return (
    <div className="PostFileContainer">
      <Link to="/profilePage">
        <img className="" src={TestPicture} alt="img" />
      </Link>
    </div>
  );
}

export default PostFileContainer;
