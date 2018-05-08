import React from 'react';
import PropTypes from 'prop-types';

const AuthorizationButton = ({ disabled, onClick }) => (
  <button
    id="authorization-button"
    className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent p-room__button--create"
    onClick={e => onClick(e)}
    disabled={disabled}
  >
    Submit
  </button>
);

AuthorizationButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AuthorizationButton;
