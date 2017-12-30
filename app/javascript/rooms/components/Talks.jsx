import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { TransitionGroup } from 'react-transition-group';

import TalksGroup from './TalksGroup';
import * as talkActions from '../actions/talks';
import * as globalActions from '../actions/globals';
import Talk from './Talk';
import NoEntry from './NoEntry';

class Talks extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    const { entries } = this.props;

    store.dispatch(talkActions.loading(true));

    if (!entries || entries.size === 0) {
      store.dispatch(talkActions.fetchTalks());
    }

    App.talks = App.cable.subscriptions.create({ channel: 'RoomChannel', name: `${this.props.name}` }, {
      received: (data) => {
        this.receiveJSON(data);
      },
      connected: () => {
        store.dispatch(globalActions.changeSocketState(true));
      },
      disconnected: () => {
        store.dispatch(globalActions.changeSocketState(false));
      }
    });
  }

  receiveJSON(data) {
    const response = JSON.parse(data);
    this.context.store.dispatch(talkActions.addTalk(response.talk));
  }

  render() {
    const { entries, loading } = this.props;

    if (loading) {
      const height = window.innerHeight - 150;
      return (
        <div className="p-talk-body__no-entry" style={{ height }}>
          <div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />
        </div>
      );
    }

    if (entries.size === 0) {
      return <NoEntry />;
    }

    return (
      <div>
        <TransitionGroup>
          {entries.map((talk, i) => (
            <TalksGroup timeout={300} key={`talk-group-${talk.get('id')}`}>
              <Talk talk={talk} key={talk.get('id')} i={i} />
            </TalksGroup>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

Talks.propTypes = {
  entries: PropTypes.instanceOf(Immutable.List),
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

Talks.contextTypes = {
  store: PropTypes.object,
};

Talks.defaultProps = {
  entries: [],
  loading: true,
};

export default connect(state => ({
  entries: state.talks.entries,
  loading: state.talks.loading,
}))(Talks);
