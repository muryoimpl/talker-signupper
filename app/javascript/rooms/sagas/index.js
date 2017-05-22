import { fork } from 'redux-saga/effects';

import { registerSignuppersTalk } from './requestForTalk';
import { fetchTalks } from './fetchTalks';

export default function* rootSaga() {
  yield fork(fetchTalks);
  yield fork(registerSignuppersTalk);
}
