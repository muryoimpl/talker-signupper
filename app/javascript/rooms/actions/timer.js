import * as Types from '../constants/actions';

export function openTimer(payload) {
  return { type: Types.OPEN_TIMER, payload };
}

export function startTimer() {
  return { type: Types.START_TIMER };
}

export function stopTimer() {
  return { type: Types.STOP_TIMER };
}

export function closeTimer() {
  return { type: Types.CLOSE_TIMER };
}

export function setTimerId(timerId) {
  const payload = { timerId };
  return { type: Types.SET_TIMER_ID, payload };
}

export function clearTimer() {
  return { type: Types.CLEAR_TIMER };
}

export function updateRemaining(remaining) {
  const payload = { remaining };
  return { type: Types.UPDATE_REMAINING, payload };
}
