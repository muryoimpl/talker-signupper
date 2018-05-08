import React from 'react';
import PropTypes from 'prop-types';

const handleClickLeave = (e, leaveAction) => {
  e.preventDefault();
  leaveAction();
};

const LeaveButton = ({ disabled, onClick }) => (
  <button
    id="leave"
    disabled={disabled}
    className="ml10 mdl-button mdl-js-button mdl-button--raised mdl-button--accent"
    onClick={e => handleClickLeave(e, onClick)}
  >
    leave this room
  </button>
);

LeaveButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LeaveButton;
