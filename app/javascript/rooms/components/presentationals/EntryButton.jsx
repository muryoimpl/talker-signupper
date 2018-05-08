import React from 'react';
import PropTypes from 'prop-types';

const clearDirty = () => {
  const mdlInputs = document.querySelectorAll('.mdl-js-textfield');
  for (let i = 0, l = mdlInputs.length; i < l; i += 1) {
    mdlInputs[i].MaterialTextfield.checkDirty();
  }
};

const handleClickSignUp = (e, showDialogFunc) => {
  e.preventDefault();
  clearDirty();
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
