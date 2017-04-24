import React from 'react';
import { connect } from 'react-redux';

class Room extends React.Component {
  render() {
    return (
      <p>hi</p>
    );
  }
}

Room.propTypes = {};

export default connect(state => state)(Room);
