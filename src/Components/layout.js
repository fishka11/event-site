import React from 'react';
import Header from './header';
import Footer from './footer';

import '../styles/layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="site-wrapper">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
