import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as talkActions from '../actions/talks';
import Talk from './Talk';

class Talks extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    const { entries } = this.props;

    if (!entries || entries.size === 0) {
      store.dispatch(talkActions.fetchTalks());
    }

    App.talks = App.cable.subscriptions.create({ channel: 'RoomChannel', name: `${this.props.name}` }, {
      received: (data) => {
        this.receiveJSON(data);
      },
    });
  }

  receiveJSON(data) {
    const response = JSON.parse(data);
    this.context.store.dispatch(talkActions.addTalk(response.talk));
  }

  render() {
    const { entries } = this.props;

    return (
      <div>
        {entries.map((talk, i) => <Talk talk={talk} key={talk.get('id')} i={i} />)}
      </div>
    );
  }
}

Talks.propTypes = {
  entries: PropTypes.instanceOf(Immutable.List),
  name: PropTypes.string.isRequired,
};

Talks.contextTypes = {
  store: PropTypes.object,
};

Talks.defaultProps = {
  entries: [],
};

export default connect(state => ({
  entries: state.talks.entries,
}))(Talks);
