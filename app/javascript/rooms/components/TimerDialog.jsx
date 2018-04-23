import { connect } from 'react-redux';

import { timeSelector } from '../selectors/timerSelector';
import * as actions from '../actions/timer';
import * as talkActions from '../actions/talks';
import Timer from './presentationals/Timer';

const mapStateToProps = state => ({
  title: state.talks.current.get('title'),
  talkerName: state.talks.current.get('talkerName'),
  timerId: state.timer.timerId,
  remaining: state.timer.remaining,
  time: timeSelector(state.timer),
  running: state.timer.running,
  entries: state.talks.entries,
  connected: state.globals.connected,
  open: state.timer.open,
  prevTime: state.timer.prevTime,
});

function setPreviousTime(time, dispatch) {
  dispatch(actions.setPrevTime(time));
}

function tickAndNext(remaining, prev, dispatch) {
  dispatch(actions.updateRemaining(remaining));
  setPreviousTime(prev, dispatch);
}

const mapDispatchToProps = dispatch => ({
  closeTimer: (open) => {
    if (open) dispatch(actions.closeTimer());
  },
  openTimer: (open) => {
    if (!open) dispatch(actions.openTimer());
  },
  clearTimer: () => {
    dispatch(actions.clearTimer());
  },
  setPrevTime: (prev) => {
    setPreviousTime(prev, dispatch);
  },
  stopTimer: (timerId) => {
    clearInterval(timerId);
    dispatch(actions.stopTimer());
  },
  resetTimer(timerId) {
    clearInterval(timerId);
    dispatch(actions.stopTimer());
    dispatch(actions.clearTimer());
  },
  startTimer: (timerId) => {
    dispatch(actions.setTimerId(timerId));
    dispatch(actions.startTimer());
  },
  prepareNextTalk: () => {
    dispatch(talkActions.nextTalk());
  },
  showNextTalk: (talk) => {
    dispatch(talkActions.pushToCurrent(talk));
    dispatch(actions.openTimer());
  },
  tick: (remaining) => {
    tickAndNext(remaining, Date.now(), dispatch);
  },
});

const TimerDialog = connect(mapStateToProps, mapDispatchToProps)(Timer);
export default TimerDialog;
