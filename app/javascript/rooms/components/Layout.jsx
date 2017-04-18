import React, { PropTypes } from 'react';

class Layout extends React.Component {
  render() {
    return (
      <div>
        hi
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
