import React from 'react';
import PropTypes from 'prop-types';

const SignupSubmitButton = ({ disabled, onClick }) => (
  <button
    id="signup"
    className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent p-room__button--create"
    onClick={onClick}
    disabled={disabled}
  >
    SignUp
  </button>
);

SignupSubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SignupSubmitButton;
