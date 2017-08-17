import { fork } from 'redux-saga/effects';

import rootSaga from '../../rooms/sagas';
import { registerSignuppersTalk } from '../../rooms/sagas/requestForTalk';
import { fetchTalks } from '../../rooms/sagas/fetchTalks';

test('fork registerSignuppersTalk', () => {
  const saga = rootSaga();

  let ret = saga.next();
  expect(ret.value).toEqual(fork(registerSignuppersTalk));

  ret = saga.next();
  expect(ret.value).toEqual(fork(fetchTalks));
});
