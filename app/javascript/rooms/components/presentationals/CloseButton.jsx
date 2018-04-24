import React from 'react';
import PropTypes from 'prop-types';

const handleClickClose = (e, onClick, selector) => {
  e.preventDefault();
  const dom = document.querySelector(selector);
  if (dom && dom.getAttribute('open') === '') dom.close();
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
