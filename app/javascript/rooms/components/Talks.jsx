import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as talkActions from '../actions/talks';
import Talk from './Talk';
import NoEntry from './NoEntry';

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

    if (entries.size === 0) return <NoEntry />;

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="p-talk-entry"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {entries.map((talk, i) => <Talk talk={talk} key={talk.get('id')} i={i} />)}
        </ReactCSSTransitionGroup>
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
