import { changeTitle, changeName, registerSignuppersTalk, clearSignupState, storeResponse, clearResponse, changeFormState } from '../../rooms/actions/signups';

test('changeTitle action', () => {
  expect(changeTitle('hi')).toEqual({ type: 'CHANGE_TITLE', title: 'hi' });
});

test('changeName action', () => {
  expect(changeName('Ken')).toEqual({ type: 'CHANGE_NAME', talker_name: 'Ken' });
});

test('registerSignuppersTalk action', () => {
  expect(registerSignuppersTalk()).toEqual({ type: 'REGISTER_SIGNUPPER_TALK' });
});

test('clearSignupState', () => {
  expect(clearSignupState()).toEqual({ type: 'CLEAR_SIGNUP_STATE' });
});

test('storeResponse', () => {
  expect(storeResponse({ status: 200 })).toEqual({ type: 'STORE_RESPONSE', response: { status: 200 } });
});

test('clearResponse', () => {
  expect(clearResponse()).toEqual({ type: 'CLEAR_RESPONSE' });
});

test('changeFormState', () => {
  expect(changeFormState(true)).toEqual({ type: 'CHANGE_FORM_STATE', submitted: true });
  expect(changeFormState(false)).toEqual({ type: 'CHANGE_FORM_STATE', submitted: false});
});
