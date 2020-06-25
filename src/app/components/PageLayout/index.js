import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './index.scss';
import Header from '../Header';
import Footer from '../Footer';

function PageLayout({ children }) {
  const history = useHistory();
  const location = useLocation();
  console.log('PageLayout', location);
  return (
    <React.Fragment>
      <div className="App">
        {location.pathname !== '/login' &&
          location.pathname !== '/register' && <Header />}
        <main className="main">{children}</main>
        {location.pathname !== '/login' &&
          location.pathname !== '/register' &&
          location.pathname !== '/' && <Footer />}
      </div>
    </React.Fragment>
  );
}

export default PageLayout;
