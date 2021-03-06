import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/index';
import Footer from './Footer/index';

function PageLayout({ children }) {
  const location = useLocation();
  // console.log('PageLayout', location);
  return (
    <React.Fragment>
      <div className="App">
        {location.pathname !== '/login' &&
          location.pathname !== '/register' &&
          location.pathname !== '/register/email/' &&
          location.pathname !== '/register/phoneNumber/' && <Header />}
        <main className="Main">{children}</main>
        {location.pathname !== '/login' &&
          location.pathname !== '/register' &&
          location.pathname !== '/register/email/' &&
          location.pathname !== '/register/phoneNumber/' &&
          location.pathname !== '/' &&
          location.pathname !== '/explore' && <Footer />}
      </div>
    </React.Fragment>
  );
}

export default PageLayout;
