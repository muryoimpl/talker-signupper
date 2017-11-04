import { fork, takeEvery } from 'redux-saga/effects';

import { registerSignuppersTalk } from './requestForTalk';
import { fetchTalks } from './fetchTalks';
import * as Types from '../constants/actions';

export default function* rootSaga() {
  yield takeEvery(Types.REGISTER_SIGNUPPER_TALK, registerSignuppersTalk);
  yield fork(fetchTalks);
}
