import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { TransitionGroup } from 'react-transition-group';

import TalksGroup from './TalksGroup';
import Talk from '../Talk';

const Done = ({ done }) => (
  <TransitionGroup>
    {done.map((talk, i) => (
      <TalksGroup timeout={300} key={`talk-group-done-${talk.get('id')}`}>
        <Talk talk={talk} key={`done-${talk.get('id')}`} i={i} done />
      </TalksGroup>
    ))}
  </TransitionGroup>
);

Done.propTypes = {
  done: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default Done;
