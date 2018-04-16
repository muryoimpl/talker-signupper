import { call, select, put } from 'redux-saga/effects';

import { shuffleTalksOrder, getShuffledTalks, getAllState } from '../shuffleTalksOrder';

const getHeader = () => ({ headers: { roomName: 'aaaa', signup: true } });
const getAuth = () => ({ authorization: { password: 'Passw0rd', response: null, authorized: false } });
const getState = () => Object.assign({}, getHeader(), getAuth());

test('shuffleTalksOrder: shuffle successes', async () => {
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(getShuffledTalks, getState().headers.roomName, getState().authorization.password));

  ret = saga.next({ status: 200 });
  expect(ret.value).toEqual(put({ type: 'STORE_AUTH_RESPONSE', response: { status: 200 } }));

  ret = saga.next();
  expect(ret.value).toEqual(put({ type: 'AUTHORIZED', authorized: true }));

  expect(saga.next()).toEqual({ done: true, value: undefined });
});

test('shuffleTalksOrder: shuffle fails', async () => {
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(getShuffledTalks, getState().headers.roomName, getState().authorization.password));

  ret = saga.next({ status: 401 });
  expect(ret.value).toEqual(put({ type: 'STORE_AUTH_RESPONSE', response: { status: 401 } }));

  ret = saga.next();
  expect(ret.value).toEqual(put({ type: 'AUTHORIZED', authorized: false }));

  expect(saga.next()).toEqual({ done: true, value: undefined });
});
