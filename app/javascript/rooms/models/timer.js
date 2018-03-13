import Immutable from 'immutable';

export const DEFAULT_REMAINING = 300000; // 1000ms * 60sec * 5min

const TimerBase = Immutable.Record({
  open: true,
  title: '',
  talkerName: '',
  timerId: null,
  remaining: DEFAULT_REMAINING,
  running: false,
});

export default class Timer extends TimerBase {
}
