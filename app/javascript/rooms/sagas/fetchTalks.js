/* eslint no-constant-condition: ["error", {"checkLoops": false }], import/prefer-default-export: 0 */
import { call, take, put, select } from 'redux-saga/effects';
import config from '../config';

import * as Types from '../constants/actions';
import * as talksActions from '../actions/talks';
import * as dialogsActions from '../actions/dialogs';
import * as restClient from '../utils/restClient';

export const getAllState = state => state;
export const getHeaders = state => state.headers;

export function fetchTalksByRoom(roomName) {
  const url = `${config.API_HOST}/api/rooms/${roomName}`;
  return restClient.get(url);
}

export function* fetchTalks() {
  while (true) {
    yield take(Types.FETCH_TALKS);

    const headers = yield select(getHeaders);
    const response = yield call(fetchTalksByRoom, headers.roomName);

    if (response.status === 200) {
      const talks = response.data.room.talks;
      yield put(talksActions.setTalks(talks));
    } else {
      const message = response.data.error;
      yield put(dialogsActions.showDialog(message));
    }

    yield put(talksActions.loading(false));
  }
}
