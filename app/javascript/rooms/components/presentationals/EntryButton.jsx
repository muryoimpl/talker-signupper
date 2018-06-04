import React from 'react';
import PropTypes from 'prop-types';

const handleClickSignUp = (e, showDialogFunc) => {
  e.preventDefault();
  document.querySelector('dialog#signup-form').showModal();
  showDialogFunc();
};

const EntryButton = ({ disabled, onClick }) => (
  <button
    id="signup"
    disabled={disabled}
    className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
    onClick={e => handleClickSignUp(e, onClick)}
  >
    entry
  </button>
);

EntryButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default EntryButton;
