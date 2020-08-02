import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

// Components
import UsersContainer from '../UsersContainer';

function Suggestions({ feed, length, closeModal }) {
  return (
    <React.Fragment>
      <div className="SuggestionsNavigation">
        <span className="SuggestionsTitle">Suggestions For You</span>
        <Link to="/explore/people/suggested">See All</Link>
      </div>
      <UsersContainer
        length={length}
        feed={feed ? true : false}
        fetchAllUsers
        closeModal={closeModal}
      />
    </React.Fragment>
  );
}

export default Suggestions;
