import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './index.scss';

function NotFound() {
  return (
    <React.Fragment>
      <div className="NotFound">
        <h2>Sorry, this page isn't available.</h2>
        <p>
          The link you followed may be broken, or the page may have been
          removed. <Link to="/">Go back to Instagram.</Link>
        </p>
      </div>
    </React.Fragment>
  );
}

export default NotFound;
