import * as Types from '../constants/actions';

export function changePassword(password) {
  return { type: Types.CHANGE_PASSWORD, password };
}

export function changePasswordFormState(isSubmitted) {
  return { type: Types.CHANGE_PASSWORD_FORM_STATE, submitted: isSubmitted };
}

export function clearPassword() {
  return { type: Types.CLEAR_PASSWORD };
}

export function authorized(isAuthorized) {
  return { type: Types.AUTHORIZED, authorized: isAuthorized };
}

export function storeAuthResponse(response) {
  return { type: Types.STORE_AUTH_RESPONSE, response };
}

export function clearAuthResponse() {
  return { type: Types.CLEAR_AUTH_RESPONSE };
}
