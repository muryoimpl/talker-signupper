import React from 'react';
import PropTypes from 'prop-types';

import Dialog from './Dialog';
import Header from './Header';
import Timer from './Timer';

class Layout extends React.Component {
  render() {
    return (
      <div className="content">
        <Dialog />
        <Timer />
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
