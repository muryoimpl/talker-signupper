import React from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({ onChange, value, disabled }) => (
  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label ml5 p-room__password">
    <input
      id="password"
      className="mdl-textfield__input"
      type="password"
      onChange={e => onChange(e.target.value)}
      value={value}
      disabled={disabled}
      autoComplete="off"
    />
    <label className="mdl-textfield__label" htmlFor="password"> Password </label>
  </div>
);

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

PasswordInput.defaultProps = {
  value: '',
};

export default PasswordInput;
