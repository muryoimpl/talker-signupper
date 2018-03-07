import * as Types from '../constants/actions';

export function openTimer(payload) {
  return { type: Types.OPEN_TIMER, payload };
}

export function closeTimer() {
  return { type: Types.CLOSE_TIMER };
}
