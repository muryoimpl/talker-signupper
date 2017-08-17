import Immutable from 'immutable';

import signups from '../../rooms/reducers/signups';

test('REGISTER_SIGNUPPER_TALK', () => {
  const initialState = Immutable.Record({ title: '', talker_name: '', response: null })();

  expect(signups(initialState, { type: 'REGISTER_SIGNUPPER_TALK' })).toEqual(initialState);
});

test('CHANGE_TITLE', () => {
  const initialState = Immutable.Record({ title: '', talker_name: '', response: null })();

  expect(signups(initialState, { type: 'CHANGE_TITLE', title: 'hi' })).toEqual(initialState.merge({ title: 'hi' }));
});

test('CHANGE_NAME', () => {
  const initialState = Immutable.Record({ title: '', talker_name: '', response: null })();

  expect(signups(initialState, { type: 'CHANGE_NAME', talker_name: 'Ken' })).toEqual(initialState.merge({ talker_name: 'Ken' }));
});

test('CLEAR_SIGNUP_STATE', () => {
  const initialState = Immutable.Record({ title: 'hi', talker_name: 'Ken', response: { status: 200 } })();

  expect(signups(initialState, { type: 'CLEAR_SIGNUP_STATE' })).toEqual(initialState.merge({ title: '', talker_name: '', response: null }));
});

test('STORE_RESPONSE', () => {
  const initialState = Immutable.Record({ title: 'hi', talker_name: 'Ken', response: null })();

  expect(signups(initialState, { type: 'STORE_RESPONSE', response: { status: 201 } })).toEqual(initialState.merge({ response: { status: 201 } }));
});

test('CLEAR_RESPONSE', () => {
  const initialState = Immutable.Record({ title: 'hi', talker_name: 'Ken', response: { status: 200 } })();

  expect(signups(initialState, { type: 'CLEAR_RESPONSE' })).toEqual(initialState.merge({ response: null }));
});
