import { fork, takeLatest } from 'redux-saga/effects';

import { registerSignuppersTalk } from './requestForTalk';
import { fetchTalks } from './fetchTalks';
import { shuffleTalksOrder } from './shuffleTalksOrder';
import * as Types from '../constants/actions';

export default function* rootSaga() {
  yield takeLatest(Types.REGISTER_SIGNUPPER_TALK, registerSignuppersTalk);
  yield fork(fetchTalks);
  yield takeLatest(Types.SHUFFLE_ORDER, shuffleTalksOrder);
}
