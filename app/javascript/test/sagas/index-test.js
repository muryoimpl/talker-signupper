import test from 'ava';
import { fork } from 'redux-saga/effects';

import rootSaga from '../../rooms/sagas';
import { registerSignuppersTalk } from '../../rooms/sagas/requestForTalk';

test('fork registerSignuppersTalk', (t) => {
  const saga = rootSaga();
  const ret = saga.next();
  t.deepEqual(ret.value, fork(registerSignuppersTalk));
});
