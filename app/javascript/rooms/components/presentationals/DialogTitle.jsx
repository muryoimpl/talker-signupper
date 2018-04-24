import React from 'react';
import PropTypes from 'prop-types';

const DialogTitle = ({ title }) => (
  <div className="mdl-card__title">
    <h2 className="mdl-card__title-text"> {title} </h2>
  </div>
);

DialogTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default DialogTitle;
