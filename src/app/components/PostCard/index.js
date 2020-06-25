import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import PostHeader from '../PostHeader';
import PostNavigation from '../PostNavigation';
import PostFileContainer from '../PostFileContainer';
import PostCommentsContainer from '../PostCommentsContainer';
import TestPicture from '../../images/3resized.jpg';
function PostCard() {
  return (
    <div className="PostCard">
      <PostHeader />
      <div className="postFileContainer">
        <img src={TestPicture} alt="" />
      </div>
      <PostNavigation />
      <PostCommentsContainer />
      <div className="postNewComment"></div>
    </div>
  );
}

export default PostCard;
