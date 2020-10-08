import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

function LinkBox() {
  const location = useLocation();
  return (
    <div className="LinkBox">
      {location.pathname === '/register' && (
        <p>
          Have an account?
          <Link className="link" to="/login">
            Log in
          </Link>
        </p>
      )}
      {location.pathname === '/login' && (
        <p>
          Don't have an account?
          <Link className="link" to="/register">
            Sign up
          </Link>
        </p>
      )}
    </div>
  );
}

export default LinkBox;
