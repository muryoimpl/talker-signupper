import {
  changePassword,
  changePasswordFormState,
  clearPassword,
  authorized,
  storeAuthResponse,
  clearAuthResponse,
} from '../../rooms/actions/authorization';

test('changePassword action', () => {
  expect(changePassword('password0')).toEqual({ type: 'CHANGE_PASSWORD', password: 'password0' });
});

test('changePasswordFormState action', () => {
  expect(changePasswordFormState(true)).toEqual({ type: 'CHANGE_PASSWORD_FORM_STATE', submitted: true });
});

test('clearPassword action', () => {
  expect(clearPassword()).toEqual({ type: 'CLEAR_PASSWORD' });
});

test('authorized action', () => {
  expect(authorized(true)).toEqual({ type: 'AUTHORIZED', authorized: true });
});

test('storeAuthResponse action', () => {
  expect(storeAuthResponse({ status: 200 })).toEqual({ type: 'STORE_AUTH_RESPONSE', response: { status: 200 } });
});

test('claerAuthResponse action', () => {
  expect(clearAuthResponse()).toEqual({ type: 'CLEAR_AUTH_RESPONSE' });
});
