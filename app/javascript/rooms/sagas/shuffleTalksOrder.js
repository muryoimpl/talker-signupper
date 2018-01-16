import { call, select, put } from 'redux-saga/effects';
import config from '../config';

import * as restClient from '../utils/restClient';
import * as authActions from '../actions/authorization';

export const getAllState = state => state;

export function getShuffledTalks(roomName, password) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks/shuffle`;
  return restClient.post(url, { password });
}

export function* shuffleTalksOrder() {
  const state = yield select(getAllState);
  const response = yield call(getShuffledTalks, state.headers.roomName, state.authorization.password);
  yield put(authActions.storeAuthResponse(response));
  yield put(authActions.authorized(response.status === 200));
}
