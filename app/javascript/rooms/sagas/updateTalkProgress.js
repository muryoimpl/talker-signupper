import { call } from 'redux-saga/effects';
import config from '../config';

import * as restClient from '../utils/restClient';

export function patchTalkProgress(talkId, progress) {
  const url = `${config.API_HOST}/api/talks/${talkId}/progress`;
  return restClient.patch(url, { progress });
}

export function* updateTalkProgress(action) {
  yield call(patchTalkProgress, action.payload.id, action.payload.progress);
}
