import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const TalksGroup = ({ children, ...props }) => (
  <CSSTransition {...props} classNames="p-talk-entry">
    {children}
  </CSSTransition>
);

TalksGroup.propTypes = {
  children: PropTypes.object.isRequired,
};

export default TalksGroup;
