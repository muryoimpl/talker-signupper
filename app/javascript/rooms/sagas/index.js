import { fork } from 'redux-saga/effects';

import { registerSignuppersTalk } from './requestForTalk';

export default function* rootSaga() {
  yield fork(registerSignuppersTalk);
}
