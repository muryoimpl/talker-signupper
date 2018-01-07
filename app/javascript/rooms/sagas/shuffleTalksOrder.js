import { call, select } from 'redux-saga/effects';
import config from '../config';

import * as restClient from '../utils/restClient';

export const getAllState = state => state;

export function getShuffledTalks(roomName) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks/shuffle`;
  return restClient.post(url, {});
}

export function* shuffleTalksOrder() {
  const state = yield select(getAllState);
  yield call(getShuffledTalks, state.headers.roomName);
}
