import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { Like, Unlike, Comment, Save, Remove } from '../icons';

function PostNavigation() {
  return (
    <div className="PostNav">
      <span>
        <Like />
      </span>
      <span>
        <Comment />
      </span>
      <span>
        <Save />
      </span>
    </div>
  );
}

export default PostNavigation;
