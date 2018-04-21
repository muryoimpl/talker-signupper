import React from 'react';
import PropTypes from 'prop-types';

import SignUp from './Signup';
import Talks from './Talks';
import AuthorizationDialog from './AuthorizationDialog';

const Room = ({ match }) => {
  const style = { marginTop: 70 };
  return (
    <div style={style}>
      <SignUp />
      <AuthorizationDialog />
      <Talks name={match.params.name} />
    </div>
  );
};

Room.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Room;
