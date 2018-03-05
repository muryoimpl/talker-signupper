import * as Types from '../constants/actions';

export function openTimer() {
  return { type: Types.OPEN_TIMER };
}

export function closeTimer() {
  return { type: Types.CLOSE_TIMER };
}
