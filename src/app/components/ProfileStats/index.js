import React from 'react';
import './index.scss';
import authentication from '../../../authentication';

function ProfileStats({ followers, following, posts }) {
  return (
    <div className="ProfileStats">
      <ul>
        <li>
          <span>{posts}</span> {posts === 1 ? 'post' : 'posts'}
        </li>
        <li className="StatsLink">
          <span>{followers}</span> {followers ? 'followers' : 'followers'}
        </li>
        <li className="StatsLink">
          <span>{following}</span> following
        </li>
      </ul>
    </div>
  );
}

export default ProfileStats;
