import React from 'react';
import PropTypes from 'prop-types';

const AppTitle = ({ title }) => (
  <span className="mdl-layout-title">
    <span><a className="text-like" href="/">{title}</a></span>
  </span>
);

AppTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppTitle;
