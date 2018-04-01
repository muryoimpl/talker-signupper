import Timer, { DEFAULT_REMAINING } from '../models/timer';
import * as Types from '../constants/actions';

export default function timer(timerState = new Timer(), action) {
  switch (action.type) {
    case Types.OPEN_TIMER:
      return timerState.merge({ open: true });
    case Types.CLOSE_TIMER:
      return timerState.merge({ open: false, title: '', talkerName: '' });
    case Types.SET_TIMER_ID:
      return timerState.merge({ timerId: action.payload.timerId });
    case Types.UPDATE_REMAINING:
      return timerState.merge({ remaining: action.payload.remaining });
    case Types.CLEAR_TIMER:
      return timerState.merge({ remaining: DEFAULT_REMAINING, timerId: null });
    case Types.START_TIMER:
      return timerState.merge({ running: true });
    case Types.STOP_TIMER:
      return timerState.merge({ running: false });
    default:
      return timerState;
  }
}
