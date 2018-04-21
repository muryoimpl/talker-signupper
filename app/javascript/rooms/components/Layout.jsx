import React from 'react';
import PropTypes from 'prop-types';

import MessageDialog from './MessageDialog';
import Header from './Header';
import TimerDialog from './TimerDialog';

const Layout = ({ children }) => (
  <div className="content">
    <MessageDialog />
    <TimerDialog />
    <Header />
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
