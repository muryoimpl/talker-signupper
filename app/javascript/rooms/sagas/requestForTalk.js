/* eslint no-constant-condition: ["error", {"checkLoops": false }], import/prefer-default-export: 0 */
import { call, put, select } from 'redux-saga/effects';
import config from '../config';

import * as headerActions from '../actions/headers';
import * as signupActions from '../actions/signups';
import * as restClient from '../utils/restClient';

export const getAllState = state => state;

export function postTalk(roomName, talk) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks`;
  return restClient.post(url, talk);
}

export function* postEntry() {
  yield put(signupActions.changeFormState(true));
  yield put(headerActions.getRoomName());
  yield put(signupActions.clearResponse());

  const state = yield select(getAllState);

  const response = yield call(postTalk, state.headers.roomName, { talk: state.signups });
  yield put(signupActions.storeResponse(response.data));
  yield put(signupActions.changeFormState(false));

  if ([200, 201].includes(response.status)) {
    yield put(signupActions.updateDialogOpen(false));
    yield put(signupActions.clearSignupState());
  }
}

export function* registerSignuppersTalk() {
  yield call(postEntry);
}
