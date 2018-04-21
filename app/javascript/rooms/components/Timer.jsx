import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import * as timerActions from '../actions/timer';
import * as talkActions from '../actions/talks';
import { timeSelector, MIN, SEC } from '../selectors/timerSelector';
import { zeroPad } from '../utils/timer';
import { DEFAULT_REMAINING } from '../models/timer';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    props.store.dispatch(timerActions.clearTimer());
    this.prevTime = null;
  }

  componentWillUnmount() {
    const { timerId } = this.props;
    if (timerId || timerId === 0) this.clear();
  }

  tick() {
    const currentTime = Date.now();
    const elapsed = currentTime - this.prevTime;
    const remaining = this.props.remaining - elapsed;
    if (remaining >= 0) {
      this.props.store.dispatch(timerActions.updateRemaining(remaining));
      this.prevTime = currentTime;
    } else {
      this.reset();
      this.props.store.dispatch(talkActions.nextTalk());
      const nextEntry = this.props.entries.first();
      this.props.store.dispatch(talkActions.pushToCurrent(nextEntry));
      this.props.store.dispatch(timerActions.openTimer());
    }
  }

  start() {
    if (this.props.remaining === DEFAULT_REMAINING) {
      this.props.store.dispatch(timerActions.updateRemaining(DEFAULT_REMAINING - 1000));
    }

    this.prevTime = Date.now();
    const timerId = setInterval(() => this.tick(), 1000);
    this.props.store.dispatch(timerActions.setTimerId(timerId));
    this.props.store.dispatch(timerActions.startTimer());
  }

  stop() {
    clearInterval(this.props.timerId);
    this.props.store.dispatch(timerActions.stopTimer());
  }

  reset() {
    clearInterval(this.props.timerId);
    this.props.store.dispatch(timerActions.stopTimer());
    this.props.store.dispatch(timerActions.clearTimer());
    this.prevTime = null;
  }

  render() {
    const { title, talkerName, time, running, timerId, connected } = this.props;
    return (
      <div className="p-timer__clock-frame">
        <div className="mdl-card__title p-timer__title">
          <h3 className="mdl-card__title-text tac p-timer__title">{title}</h3>
        </div>
        <div className="mdl-card__supporting-text p-timer__talker-name">{talkerName}</div>

        <div className="p-timer__body">
          <span className="p-timer__clock">
            {zeroPad(time[MIN])}:{zeroPad(time[SEC])}
          </span>
        </div>

        <div className="mdl-dialog__actions">
          <button type="button" className="mdl-button" disabled={!connected || running} onClick={() => this.start()}>Start</button>
          <button type="button" className="mdl-button" disabled={!running} onClick={() => this.stop()}>Stop</button>
          <button type="button" className="mdl-button" disabled={running || !timerId} onClick={() => this.reset()}>Reset</button>
        </div>
      </div>
    );
  }
}

Timer.propTypes = {
  title: PropTypes.string,
  talkerName: PropTypes.string,
  store: PropTypes.object.isRequired,
  timerId: PropTypes.number,
  remaining: PropTypes.number,
  time: PropTypes.arrayOf(PropTypes.number),
  running: PropTypes.bool,
  entries: PropTypes.instanceOf(Immutable.List).isRequired,
  connected: PropTypes.bool,
};

Timer.defaultProps = {
  title: '',
  talkerName: '',
  timerId: null,
  remaining: 0,
  time: [0, 0],
  running: false,
  connected: false,
};

export default connect(state => ({
  title: state.talks.current.get('title'),
  talkerName: state.talks.current.get('talkerName'),
  timerId: state.timer.timerId,
  remaining: state.timer.remaining,
  time: timeSelector(state.timer),
  running: state.timer.running,
  entries: state.talks.entries,
  connected: state.globals.connected,
}))(Timer);
