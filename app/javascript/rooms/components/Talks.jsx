import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { TransitionGroup } from 'react-transition-group';

import TalksGroup from './TalksGroup';
import * as talkActions from '../actions/talks';
import * as dialogsActions from '../actions/dialogs';
import * as globalActions from '../actions/globals';
import Talk from './Talk';
import NoEntry from './NoEntry';
import Spinner from './Spinner';

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
      },
    });
  }

  receiveJSON(data) {
    const { store } = this.context;
    const response = JSON.parse(data);

    if (response.error) {
      store.dispatch(dialogsActions.showDialog(response.error));
      return;
    }

    switch (response.action) {
      case 'create-talk':
        store.dispatch(talkActions.addTalk(response.talk));
        break;
      case 'shuffled-talks':
        store.dispatch(talkActions.setTalks(response.room.talks));
        break;
      default:
        console.error(`unknown action: ${response.action}`); // eslint-disable-line no-console
    }
  }

  render() {
    const { entries, loading } = this.props;
    const height = window.innerHeight - 150;

    return (
      <div>
        {loading &&
          <Spinner height={height} loading={loading} />
        }
        {entries.size === 0 &&
          <NoEntry />
        }
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
