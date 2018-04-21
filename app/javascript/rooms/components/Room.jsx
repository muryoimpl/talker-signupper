import React from 'react';
import PropTypes from 'prop-types';

import SignUp from './SignUp';
import Talks from './Talks';
import AuthorizationDialog from './AuthorizationDialog';

class Room extends React.Component {
  render() {
    const style = { marginTop: 70 };

    return (
      <div style={style}>
        <SignUp />
        <AuthorizationDialog />
        <Talks name={this.props.match.params.name} />
      </div>
    );
  }
}

Room.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Room;
