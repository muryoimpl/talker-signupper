import test from 'ava';
import { take, put, call, select } from 'redux-saga/effects';
import nock from 'nock';

import * as Types from '../../rooms/constants/actions';
import { registerSignuppersTalk, postTalk, getAllState } from '../../rooms/sagas/requestForTalk';
import * as headerActions from '../../rooms/actions/headers';
import * as signupActions from '../../rooms/actions/signups';
import Immutable from 'immutable';

const getSignup = () => ({ signups: { title: 'hi', talker_name: 'Ken', response: null } });
const getHeader = () => ({ headers: { roomName: 'aaaa', signup: true } });
const getState = () => Object.assign({}, getSignup(), getHeader());
const createdResponse = {
  status: 201,
  errors: [],
  talk: {
    id: 1,
    title: 'hi',
    talker_name: 'Ken',
    created_at: '2017-05-05T12:00:00.000Z',
    updated_at: '2017-05-05T12:00:00.000Z',
    room: {
      id: 1,
      name: 'aaaa',
      created_at: '2017-05-05T11:00:00.000Z',
      updated_at: '2017-05-05T11:00:00.000Z',
    },
  },
};

test('registerSignuppersTalk: request success', async (t) => {
  const saga = registerSignuppersTalk();

  let ret = saga.next();
  t.deepEqual(ret.value, take(Types.REGISTER_SIGNUPPER_TALK));

  ret = saga.next();
  t.deepEqual(ret.value, put(signupActions.changeFormState(true)));

  ret = saga.next(getSignup());
  t.deepEqual(ret.value, put(headerActions.getRoomName()));

  ret = saga.next(Object.assign({}, getSignup(), { signups: { response: { status: 200 } } }));
  t.deepEqual(ret.value, put(signupActions.clearResponse()));

  ret = saga.next(getState());
  t.deepEqual(ret.value, select(getAllState));

  nock('http://localhost:3000')
    .post('/api/rooms/aaaa/talks', { talk: { title: 'hi', talker_name: 'Ken', response: null } })
    .reply(201, createdResponse);

  ret = saga.next(getState());
  t.deepEqual(ret.value, await call(postTalk, 'aaaa', { talk: { title: 'hi', talker_name: 'Ken', response: null } }));

  ret = saga.next(createdResponse);
  t.deepEqual(ret.value, put(signupActions.storeResponse(createdResponse)));

  ret = saga.next(Object.assign({}, getState(), { signups: { response: createdResponse } }));
  t.deepEqual(ret.value, select(getAllState));

  ret = saga.next(Object.assign({}, getState(), { signups: { response: Immutable.Record(createdResponse)() } }));
  t.deepEqual(ret.value, put(signupActions.clearSignupState()));

  ret = saga.next();
  t.deepEqual(ret.value, put(headerActions.closeSignUp()));

  ret = saga.next();
  t.deepEqual(ret.value, put(signupActions.changeFormState(false)));
});
