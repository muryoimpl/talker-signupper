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

export function storeResponse(response) {
  return { type: Types.STORE_RESPONSE, response };
}

export function clearResponse() {
  return { type: Types.CLEAR_RESPONSE };
}

export function changeFormState(isSubmitted) {
  return { type: Types.CHANGE_FORM_STATE, submitted: isSubmitted };
}

export function updateDialogOpen(isOpen) {
  return { type: Types.UPDATE_DIALOG_OPEN, open: isOpen };
}
