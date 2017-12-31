import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ height }) => (
  <div className="p-talk-body__no-entry" style={{ height }}>
    <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
  </div>
);

Spinner.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Spinner;
