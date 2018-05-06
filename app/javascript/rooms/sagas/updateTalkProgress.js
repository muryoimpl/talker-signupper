import { call, put } from 'redux-saga/effects';
import config from '../config';

import * as restClient from '../utils/restClient';
import * as talkActions from '../actions/talks';

export const getAllState = state => state;

export function patchTalkProgress(talkId, progress) {
  const url = `${config.API_HOST}/api/talks/${talkId}/progress`;
  return restClient.patch(url, { progress });
}

export function* updateTalkProgress(action) {
  const response = yield call(patchTalkProgress, action.payload.talkId, action.payload.progress);
  if (response.status === 200) {
    yield put(talkActions.updateTalkProgress(action.payload.talkId, action.payload.progress));
  }
}
