import Immutable from 'immutable';

const TimerBase = Immutable.Record({
  open: true,
});

export default class Timer extends TimerBase {
}
