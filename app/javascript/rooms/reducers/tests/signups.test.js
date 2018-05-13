import Immutable from 'immutable';

import signups from '../signups';
import SignupForm from '../../models/signupForm';

test('REGISTER_SIGNUPPER_TALK', () => {
  const initialState = Immutable.Record({ title: '', talkerName: '', response: null })();

  expect(signups(initialState, { type: 'REGISTER_SIGNUPPER_TALK' })).toEqual(initialState);
});

test('CHANGE_TITLE', () => {
  const initialState = Immutable.Record({ title: '', talkerName: '', response: null })();

  expect(signups(initialState, { type: 'CHANGE_TITLE', title: 'hi' })).toEqual(initialState.merge({ title: 'hi' }));
});

test('CHANGE_NAME', () => {
  const initialState = Immutable.Record({ title: '', talkerName: '', response: null })();

  expect(signups(initialState, { type: 'CHANGE_NAME', talkerName: 'Ken' })).toEqual(initialState.merge({ talkerName: 'Ken' }));
});

test('CLEAR_SIGNUP_STATE', () => {
  const initialState = Immutable.Record({ title: 'hi', talkerName: 'Ken', response: { status: 200 } })();

  expect(signups(initialState, { type: 'CLEAR_SIGNUP_STATE' })).toEqual(initialState.merge({ title: '', talkerName: '', response: null }));
});

test('STORE_RESPONSE', () => {
  const initialState = Immutable.Record({ title: 'hi', talkerName: 'Ken', response: null })();

  expect(signups(initialState, { type: 'STORE_RESPONSE', response: { status: 201 } })).toEqual(initialState.merge({ response: { status: 201 } }));
});

test('CLEAR_RESPONSE', () => {
  const initialState = Immutable.Record({ title: 'hi', talkerName: 'Ken', response: { status: 200 } })();

  expect(signups(initialState, { type: 'CLEAR_RESPONSE' })).toEqual(initialState.merge({ response: null }));
});

test('CHANGE_FORM_STATE', () => {
  const initialState = Immutable.Record({ submitted: false, title: 'hi', talkerName: 'Ken', response: { status: 200 } })();

  expect(signups(initialState, { type: 'CHANGE_FORM_STATE', submitted: true })).toEqual(initialState.merge({ submitted: true }));
});

test('UPDATE_DIALOG_OPEN', () => {
  const initialState = Immutable.Record({ open: false, title: 'hi', talkerName: 'Ken', response: { status: 200 } })();

  expect(signups(initialState, { type: 'UPDATE_DIALOG_OPEN', open: true })).toEqual(initialState.merge({ open: true }));
});

test('unknown type', () => {
  const initialState = new SignupForm();
  expect(signups(undefined, { type: 'UNKNOWN' })).toEqual(initialState);
});
