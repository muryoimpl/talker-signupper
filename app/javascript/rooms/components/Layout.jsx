import React from 'react';
import PropTypes from 'prop-types';

import MessageDialog from './MessageDialog';
import Header from './Header';
import TimerDialog from './TimerDialog';

class Layout extends React.Component {
  render() {
    return (
      <div className="content">
        <MessageDialog />
        <TimerDialog />
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
