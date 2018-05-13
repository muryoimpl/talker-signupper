import React from 'react';
import PropTypes from 'prop-types';

const SignupErrors = ({ errors }) => (
  <div className="mdl-card__supporting-text">
    {errors.map(e =>
      <p className="error" key={e}>{e}</p>,
    )}
  </div>
);

SignupErrors.propTypes = {
  errors: PropTypes.object || PropTypes.array,
};

SignupErrors.defaultProps = {
  errors: [],
};
export default SignupErrors;
