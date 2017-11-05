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

    // TODO: WebSocket のコントロールをここらへんで行う
    // App.talks = App.cable.subscriptions.create('TalkChannel', {
    //   received: (data) => {
    //     store.dispatch(talkActions.addTalk(JSON.parse(data)));
    //   },
    // });
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
