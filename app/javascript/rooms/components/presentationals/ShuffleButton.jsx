import React from 'react';
import PropTypes from 'prop-types';

const handleShuffleOrder = async (e, authorized, shuffleFunc) => {
  e.preventDefault();
  if (authorized) {
    await shuffleFunc();
  } else {
    document.querySelector('dialog#authorization-form').showModal();
  }
};

const ShuffleButton = ({ disabled, authorized, onClick }) => (
  <button
    id="shuffle"
    disabled={disabled}
    className="mdl-button mdl-js-button mdl-button--raised p-header__shuffle"
    onClick={e => handleShuffleOrder(e, authorized, onClick)}
  >
    shuffle
  </button>
);

ShuffleButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  authorized: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShuffleButton;
