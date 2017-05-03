import React from 'react';

import SignUp from './SignUp';

class Room extends React.Component {
  render() {
    return (
      <div>
        <SignUp />
        <p>hi</p>
      </div>
    );
  }
}

Room.propTypes = {};

export default Room;
