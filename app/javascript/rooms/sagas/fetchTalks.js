/* eslint no-constant-condition: ["error", {"checkLoops": false }], import/prefer-default-export: 0 */
import { call, take, put, select } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

import * as Types from '../constants/actions';
import * as talksActions from '../actions/talks';

export const getAllState = state => state;
export const getHeaders = state => state.headers;

export function fetchTalksByRoom(roomName) {
  const url = `${config.API_HOST}/api/rooms/${roomName}`;
  return axios.get(url).then(response => response).catch(error => error.response.data);
}

export function* fetchTalks() {
  while (true) {
    yield take(Types.FETCH_TALKS);

    const headers = yield select(getHeaders);
    const response = yield call(fetchTalksByRoom, headers.roomName);

    if (response.status === 200) {
      yield put(talksActions.setTalks(response.room.talks));
    }
  }
}
