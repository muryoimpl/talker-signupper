import * as Types from '../constants/actions';

export function showDialog(message) {
  return { type: Types.SHOW_DIALOG, message };
}

export function closeDialog() {
  return { type: Types.CLOSE_DIALOG };
}
