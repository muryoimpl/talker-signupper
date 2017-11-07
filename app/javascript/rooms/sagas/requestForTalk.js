/* eslint no-constant-condition: ["error", {"checkLoops": false }], import/prefer-default-export: 0 */
import { call, put, select, cancelled, cancel } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

import * as headerActions from '../actions/headers';
import * as signupActions from '../actions/signups';

export const getAllState = state => state;

export function postTalk(roomName, talk) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks`;
  return axios.post(url, talk).then(res => res.data).catch(error => error.response.data);
}

export function* postEntry() {
  yield put(signupActions.changeFormState(true));
  yield put(headerActions.getRoomName());
  yield put(signupActions.clearResponse());

  const state = yield select(getAllState);

  const response = yield call(postTalk, state.headers.roomName, { talk: state.signups });
  yield put(signupActions.storeResponse(response));
  yield put(signupActions.changeFormState(false));

  if (response.status < 300) {
    yield put(signupActions.updateDialogOpen(false));
    yield put(signupActions.clearSignupState());
  }
}

export function* registerSignuppersTalk() {
  yield call(postEntry);
}
