import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

import TestPicture from '../../images/3resized.jpg';

function PostHeader() {
  return (
    <div className="PostHeader">
      <div className="PostAvatar">
        <img src={TestPicture} />
      </div>
      <Link to="/profilePage" className="PostUsername">
        Username
      </Link>
    </div>
  );
}

export default PostHeader;
