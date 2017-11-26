import { fork, takeLatest } from 'redux-saga/effects';

import rootSaga from '../../rooms/sagas';
import { registerSignuppersTalk } from '../../rooms/sagas/requestForTalk';
import { fetchTalks } from '../../rooms/sagas/fetchTalks';
import { shuffleTalksOrder } from '../../rooms/sagas/shuffleTalksOrder';
import * as Types from '../../rooms/constants/actions';

test('fork registerSignuppersTalk', () => {
  const saga = rootSaga();

  let ret = saga.next();
  expect(ret.value).toEqual(takeLatest(Types.REGISTER_SIGNUPPER_TALK, registerSignuppersTalk));

  ret = saga.next();
  expect(ret.value).toEqual(fork(fetchTalks));

  ret = saga.next();
  expect(ret.value).toEqual(takeLatest(Types.SHUFFLE_ORDER, shuffleTalksOrder));
});
