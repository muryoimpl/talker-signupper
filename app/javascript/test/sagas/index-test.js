import test from 'ava';
import { fork } from 'redux-saga/effects';

import rootSaga from '../../rooms/sagas';
import { registerSignuppersTalk } from '../../rooms/sagas/requestForTalk';
import { fetchTalks } from '../../rooms/sagas/fetchTalks';

test('fork registerSignuppersTalk', (t) => {
  const saga = rootSaga();

  let ret = saga.next();
  t.deepEqual(ret.value, fork(registerSignuppersTalk));

  ret = saga.next();
  t.deepEqual(ret.value, fork(fetchTalks));
});
