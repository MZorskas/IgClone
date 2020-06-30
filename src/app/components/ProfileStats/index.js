import React from 'react';
import './index.scss';
import authentication from '../../../authentication';

function ProfileStats({ followers, following }) {
  console.log('ProfileStats', { followers, following });
  return (
    <div className="ProfileStats">
      <ul>
        <li>
          <span>0</span> posts
        </li>
        <li className="StatsLink">
          <span>{followers.length}</span> followers
        </li>
        <li className="StatsLink">
          <span>{following.length}</span> following
        </li>
      </ul>
    </div>
  );
}

export default ProfileStats;
