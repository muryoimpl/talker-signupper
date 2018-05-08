import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { TransitionGroup } from 'react-transition-group';

import TalksGroup from './TalksGroup';
import Talk from '../Talk';

const Entries = ({ entries }) => (
  <TransitionGroup>
    {entries.map((talk, i) => (
      <TalksGroup timeout={300} key={`talk-group-${talk.get('id')}`}>
        <Talk talk={talk} key={talk.get('id')} i={i} done={false} />
      </TalksGroup>
    ))}
  </TransitionGroup>
);

Entries.propTypes = {
  entries: PropTypes.instanceOf(Immutable.List).isRequired,
};

export default Entries;
