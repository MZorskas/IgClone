import React from 'react';
import './index.scss';
import PostCard from '../PostCard';

function FeedContainer({ movies, favorites }) {
  console.log('FeedContainer', favorites);
  return (
    <div className="FeedContainer">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}

export default FeedContainer;
