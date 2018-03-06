import React from 'react';
import { connect } from 'react-redux';

class Timer extends React.Component {
  render() {
    return (
      <div>
        TIMER
      </div>
    );
  }
}

export default connect(state => state)(Timer);
