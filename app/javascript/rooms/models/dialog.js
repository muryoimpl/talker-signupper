import Immutable from 'immutable';

const DialogBase = Immutable.Record({
  message: '',
  isDisplay: false,
});

export default class Dialog extends DialogBase {
}
