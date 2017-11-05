import React from 'react';

import SignUp from './SignUp';
import Talks from './Talks';

class Room extends React.Component {
  render() {
    const style = { marginTop: 70 };

    return (
      <div style={style}>
        <SignUp />
        <Talks />
      </div>
    );
  }
}

Room.propTypes = {};

export default Room;
