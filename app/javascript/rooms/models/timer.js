import Immutable from 'immutable';

const TimerBase = Immutable.Record({
  open: true,
  title: '',
  talkerName: '',
});

export default class Timer extends TimerBase {
}
