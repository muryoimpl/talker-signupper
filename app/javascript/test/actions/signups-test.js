import test from 'ava';

import { changeTitle, changeName, registerSignuppersTalk, clearSignupState, storeResponse, clearResponse } from '../../rooms/actions/signups';

test('changeTitle action', (t) => {
  t.deepEqual(changeTitle('hi'), { type: 'CHANGE_TITLE', title: 'hi' });
});

test('changeName action', (t) => {
  t.deepEqual(changeName('Ken'), { type: 'CHANGE_NAME', talker_name: 'Ken' });
});

test('registerSignuppersTalk action', (t) => {
  t.deepEqual(registerSignuppersTalk(), { type: 'REGISTER_SIGNUPPER_TALK' });
});

test('clearSignupState', (t) => {
  t.deepEqual(clearSignupState(), { type: 'CLEAR_SIGNUP_STATE' });
});

test('storeResponse', (t) => {
  t.deepEqual(storeResponse({ status: 200 }), { type: 'STORE_RESPONSE', response: { status: 200 } });
});

test('clearResponse', (t) => {
  t.deepEqual(clearResponse(), { type: 'CLEAR_RESPONSE' });
});
