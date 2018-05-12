import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { MIN, SEC } from '../../selectors/timerSelector';
import { zeroPad } from '../../utils/timer';
import CloseButton from './CloseButton';
import Progress from './Progress';
import { DEFAULT_REMAINING } from '../../models/timer';

export default class Timer extends React.Component {
  componentDidMount() {
    this.props.clearTimer();
  }

  tick() {
    const currentTime = Date.now();
    const elapsed = currentTime - this.props.prevTime;
    const remaining = this.props.remaining - elapsed;

    if (remaining >= 0) {
      this.props.tick(remaining);
      // TODO: 状況ごとに progress を更新する処理を書く
    } else {
      this.props.updateTalkProgress(this.props.talkId, 'done');
      this.props.clearTimer(this.props.timerId);
      this.props.prepareNextTalk();
      const nextEntry = this.props.entries.first();
      this.props.showNextTalk(nextEntry);
    }
  }

  start() {
    this.props.setPrevTime(Date.now());
    const timerId = setInterval(() => this.tick(), 1000);
    this.props.startTimer(timerId);
  }

  render() {
    const { title, talkerName, time, running, timerId, connected, remaining, talkId } = this.props;
    return (
      <dialog className="mdl-dialog p-timer__dialog-frame" id="timer-frame">
        <CloseButton onClick={this.props.closeTimer} selector="dialog#timer-frame" />

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
          <Progress progress={((DEFAULT_REMAINING - remaining) / DEFAULT_REMAINING) * 100} />

          <div className="mdl-dialog__actions">
            <button type="button" className="mdl-button" disabled={!connected || running} onClick={() => this.start()}>Start</button>
            <button type="button" className="mdl-button" disabled={!running} onClick={() => this.props.stopTimer(timerId)}>Stop</button>
            <button type="button" className="mdl-button" disabled={running || !timerId} onClick={() => this.props.resetTimer(timerId, talkId)}>Reset</button>
          </div>
        </div>
      </dialog>
    );
  }
}

Timer.propTypes = {
  title: PropTypes.string,
  talkerName: PropTypes.string,
  timerId: PropTypes.number,
  talkId: PropTypes.number,
  remaining: PropTypes.number,
  prevTime: PropTypes.number,
  time: PropTypes.arrayOf(PropTypes.number),
  running: PropTypes.bool,
  entries: PropTypes.instanceOf(Immutable.List).isRequired,
  connected: PropTypes.bool,
  closeTimer: PropTypes.func.isRequired,
  clearTimer: PropTypes.func.isRequired,
  setPrevTime: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  prepareNextTalk: PropTypes.func.isRequired,
  showNextTalk: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,
  updateTalkProgress: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  title: '',
  talkerName: '',
  talkId: 0,
  timerId: null,
  remaining: 0,
  time: [0, 0],
  running: false,
  connected: false,
  prevTime: null,
};
