import * as Types from '../constants/actions';

export function registerSignuppersTalk() {
  return { type: Types.REGISTER_SIGNUPPER_TALK };
}

export function changeTitle(title) {
  return { type: Types.CHANGE_TITLE, title };
}

export function changeName(name) {
  return { type: Types.CHANGE_NAME, talker_name: name };
}

export function clearSignupState() {
  return { type: Types.CLEAR_SIGNUP_STATE };
}
