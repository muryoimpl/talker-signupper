import React from 'react';
import PropTypes from 'prop-types';

const barStyle = progress => ({ width: `${progress}%`, height: 6, marginBottom: 2 });

const Progress = ({ progress, type }) => (
  <div
    style={barStyle(progress)}
    className={`mdl-js-progress mdl-progress ${type === 'indeterminate' ? 'mdl-progress__indeterminate' : ''}`}
  />
);

Progress.propTypes = {
  progress: PropTypes.number,
  type: PropTypes.string,
};
Progress.defaultProps = {
  progress: 0,
  type: '',
};

export default Progress;
