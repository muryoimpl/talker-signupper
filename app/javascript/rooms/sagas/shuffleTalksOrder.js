import { call, put, select } from 'redux-saga/effects';
import config from '../config';

import * as talksActions from '../actions/talks';
import * as dialogsActions from '../actions/dialogs';
import * as restClient from '../utils/restClient';

export const getAllState = state => state;

export function getShuffledTalks(roomName) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks/shuffle`;
  return restClient.post(url, {});
}

export function* shuffleTalksOrder() {
  const state = yield select(getAllState);
  const response = yield call(getShuffledTalks, state.headers.roomName);

  if (response.status === 200) {
    const talks = response.data.room.talks;
    yield put(talksActions.setTalks(talks));
  } else {
    const message = response.data.error;
    yield put(dialogsActions.showDialog(message));
  }
}
