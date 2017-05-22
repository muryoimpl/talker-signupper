/* eslint no-constant-condition: ["error", {"checkLoops": false }], import/prefer-default-export: 0 */
import { call, take, put, select } from 'redux-saga/effects';
import axios from 'axios';
import config from '../config';

import * as Types from '../constants/actions';
import * as headerActions from '../actions/headers';
import * as signupActions from '../actions/signups';

export const getAllState = state => state;

export function postTalk(roomName, talk) {
  const url = `${config.API_HOST}/api/rooms/${roomName}/talks`;
  return axios.post(url, talk).then(response => response).catch(response => response);
}

export function* registerSignuppersTalk() {
  while (true) {
    yield take(Types.REGISTER_SIGNUPPER_TALK);

    yield put(signupActions.changeFormState(true));

    yield put(headerActions.getRoomName());
    yield put(signupActions.clearResponse());

    let state = yield select(getAllState);
    const response = yield call(postTalk, state.headers.roomName, { talk: state.signups });
    yield put(signupActions.storeResponse(response));

    state = yield select(getAllState);
    if (state.signups.response.get('status') === 201) {
      yield put(signupActions.clearSignupState());
      yield put(headerActions.closeSignUp());
    }

    yield put(signupActions.changeFormState(false));
  }
}
