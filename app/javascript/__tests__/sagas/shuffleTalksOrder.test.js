import { call, select } from 'redux-saga/effects';

import { shuffleTalksOrder, getShuffledTalks, getAllState } from '../../rooms/sagas/shuffleTalksOrder';

const getHeader = () => ({ headers: { roomName: 'aaaa', signup: true } });
const getState = () => Object.assign({}, getHeader());

test('shuffleTalksOrder: shuffle successes', async () => {
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(getShuffledTalks, getState().headers.roomName));

  ret = saga.next();
  expect(ret).toEqual({ done: true, value: undefined });
});

test('shuffleTalksOrder: shuffle fails', async () => {
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(getShuffledTalks, getState().headers.roomName));

  ret = saga.next();
  expect(ret).toEqual({ done: true, value: undefined });
});
