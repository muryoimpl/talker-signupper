import { call, select, put } from 'redux-saga/effects';

import { shuffleTalksOrder, getShuffledTalks, getAllState } from '../shuffleTalksOrder';
import { wait } from '../../utils/timer';

const getHeader = () => ({ headers: { roomName: 'aaaa', signup: true } });
const getAuth = obj => ({ authorization: { password: 'Passw0rd', response: null, authorized: obj.authorized } });
const getState = obj => Object.assign({}, getHeader(), getAuth(obj));

test('shuffleTalksOrder: shuffle successes', async () => {
  const authorized = { authorized: true };
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState(authorized));
  expect(ret.value).toEqual(await call(getShuffledTalks, getState(authorized).headers.roomName, getState(authorized).authorization.password));

  ret = saga.next({ status: 200 });
  expect(ret.value).toEqual(put({ type: 'STORE_AUTH_RESPONSE', response: { status: 200 } }));

  ret = saga.next();
  expect(ret.value).toEqual(put({ type: 'AUTHORIZED', authorized: true }));

  ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState(authorized));
  expect(ret.value).toEqual(put({ type: 'LOADING', loading: true }));
  ret = saga.next();
  expect(ret.value).toEqual(call(wait, 1000));
  ret = saga.next();
  expect(ret.value).toEqual(put({ type: 'LOADING', loading: false }));

  expect(saga.next()).toEqual({ done: true, value: undefined });
});

test('shuffleTalksOrder: shuffle fails', async () => {
  const notAuthorized = { authorized: false };
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState(notAuthorized));
  expect(ret.value).toEqual(await call(getShuffledTalks, getState(notAuthorized).headers.roomName, getState(notAuthorized).authorization.password));

  ret = saga.next({ status: 401 });
  expect(ret.value).toEqual(put({ type: 'STORE_AUTH_RESPONSE', response: { status: 401 } }));

  ret = saga.next();
  expect(ret.value).toEqual(put({ type: 'AUTHORIZED', authorized: false }));

  ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState(notAuthorized));
  expect(saga.next()).toEqual({ done: true, value: undefined });
});
