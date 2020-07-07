import React from 'react';
import './index.scss';

// Components
import UsersContainer from '../UsersContainer';

function Suggestions() {
  return (
    <div className="Suggestions">
      <span className="SuggestionsTitle">Suggestions For You</span>
      <UsersContainer fetchAllUsers />
    </div>
  );
}

export default Suggestions;
