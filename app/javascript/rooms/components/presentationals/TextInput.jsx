import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ id, disabled, onChange, value, label }) => (
  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ml5 p-room__name">
    <input
      id={id}
      className="mdl-textfield__input"
      type="text"
      onChange={e => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      autoComplete="off"
    />
    <label className="mdl-textfield__label" htmlFor={id}> {label} </label>
  </div>
);

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  value: '',
};

export default TextInput;
