import React from 'react';
import PropTypes from 'prop-types';

export const closeDialog = (selector) => {
  const dom = document.querySelector(selector);
  if (dom && dom.getAttribute('open') === '') dom.close();
};

const handleClickClose = (e, onClick, selector) => {
  e.preventDefault();
  closeDialog(selector);
  onClick();
};

const CloseButton = ({ onClick, selector }) => (
  <button className="mdl-button mdl-js-button mdl-button--icon c-dialog__close" onClick={e => handleClickClose(e, onClick, selector)}>
    <i className="material-icons">cancel</i>
  </button>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  selector: PropTypes.string.isRequired,
};

export default CloseButton;
