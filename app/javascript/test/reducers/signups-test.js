import test from 'ava';
import Immutable from 'immutable';

import signups from '../../rooms/reducers/signups';

test('REGISTER_SIGNUPPER_TALK', (t) => {
  const initialState = Immutable.Record({ title: '', talker_name: '', response: null })();

  t.deepEqual(
    signups(initialState, { type: 'REGISTER_SIGNUPPER_TALK' }),
    initialState,
  );
});

test('CHANGE_TITLE', (t) => {
  const initialState = Immutable.Record({ title: '', talker_name: '', response: null })();

  t.deepEqual(
    signups(initialState, { type: 'CHANGE_TITLE', title: 'hi' }),
    initialState.merge({ title: 'hi' }),
  );
});

test('CHANGE_NAME', (t) => {
  const initialState = Immutable.Record({ title: '', talker_name: '', response: null })();

  t.deepEqual(
    signups(initialState, { type: 'CHANGE_NAME', talker_name: 'Ken' }),
    initialState.merge({ talker_name: 'Ken' }),
  );
});

test('CLEAR_SIGNUP_STATE', (t) => {
  const initialState = Immutable.Record({ title: 'hi', talker_name: 'Ken', response: { status: 200 } })();

  t.deepEqual(
    signups(initialState, { type: 'CLEAR_SIGNUP_STATE' }),
    initialState.merge({ title: '', talker_name: '', response: null }),
  );
});

test('STORE_RESPONSE', (t) => {
  const initialState = Immutable.Record({ title: 'hi', talker_name: 'Ken', response: null })();

  t.deepEqual(
    signups(initialState, { type: 'STORE_RESPONSE', response: { status: 201 } }),
    initialState.merge({ response: { status: 201 } }),
  );
});

test('CLEAR_RESPONSE', (t) => {
  const initialState = Immutable.Record({ title: 'hi', talker_name: 'Ken', response: { status: 200 } })();

  t.deepEqual(
    signups(initialState, { type: 'CLEAR_RESPONSE' }),
    initialState.merge({ response: null }),
  );
});
