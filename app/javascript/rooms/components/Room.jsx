import React from 'react';

import SignUp from './SignUp';
import Talks from './Talks';

class Room extends React.Component {
  render() {
    return (
      <div>
        <SignUp />
        <p>hi</p>
        <Talks />
      </div>
    );
  }
}

Room.propTypes = {};

export default Room;
