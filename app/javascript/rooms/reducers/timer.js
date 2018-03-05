import Timer from '../models/timer';
import * as Types from '../constants/actions';

export default function timer(timerState = new Timer(), action) {
  switch (action.type) {
    case Types.OPEN_TIMER:
      return timerState.merge({ open: true });
    case Types.CLOSE_TIMER:
      return timerState.merge({ open: false });
    default:
      return timerState;
  }
}
