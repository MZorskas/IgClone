import React from 'react';
import './index.scss';
import PostCard from '../PostCard';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';

function PostsContainer() {
  const { username } = useParams();
  console.log('PostsContainer', username);
  return (
    <div class="PostsContainer" id="PostsContainer">
      {/* <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard /> */}
    </div>
  );
}

export default PostsContainer;
