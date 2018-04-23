import { call, select, put } from 'redux-saga/effects';
import config from '../config';

import * as restClient from '../utils/restClient';
import * as authActions from '../actions/authorization';
import * as talkActions from '../actions/talks';
import { wait } from '../utils/timer';

export const getAllState = state => state;

export function getShuffledTalks(roomName, password) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks/shuffle`;
  return restClient.post(url, { password });
}

export function* shuffleTalksOrder() {
  let state = yield select(getAllState);
  const response = yield call(getShuffledTalks, state.headers.roomName, state.authorization.password);
  yield put(authActions.storeAuthResponse(response));
  yield put(authActions.authorized(response.status === 200));

  state = yield select(getAllState);
  if (state.authorization.authorized) {
    yield put(talkActions.loading(true));
    yield call(wait, 1000);
    yield put(talkActions.loading(false));
  }
}
