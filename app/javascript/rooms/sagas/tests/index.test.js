import { fork, takeLatest } from 'redux-saga/effects';

import rootSaga from '../index';
import { registerSignuppersTalk } from '../requestForTalk';
import { fetchTalks } from '../fetchTalks';
import { shuffleTalksOrder } from '../shuffleTalksOrder';
import * as Types from '../../constants/actions';

test('fork registerSignuppersTalk', () => {
  const saga = rootSaga();

  let ret = saga.next();
  expect(ret.value).toEqual(takeLatest(Types.REGISTER_SIGNUPPER_TALK, registerSignuppersTalk));

  ret = saga.next();
  expect(ret.value).toEqual(fork(fetchTalks));

  ret = saga.next();
  expect(ret.value).toEqual(takeLatest(Types.SHUFFLE_ORDER, shuffleTalksOrder));
});
