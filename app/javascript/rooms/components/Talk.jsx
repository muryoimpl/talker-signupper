import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

export default class Talk extends React.Component {
  render() {
    const { talk } = this.props;
    const id = talk.get('id');
    const title = talk.get('title');
    const talkerName = talk.get('talker_name');

    return (
      <div key={`${title}-${talkerName}-${id}`}>
        <span>{title}</span>
        <span>{talkerName}</span>
      </div>
    );
  }
}

Talk.propTypes = {
  talk: PropTypes.instanceOf(Immutable.Map).isRequired,
};
