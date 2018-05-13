import { call } from 'redux-saga/effects';
import axios from 'axios';

import { updateTalkProgress, patchTalkProgress } from '../updateTalkProgress';
import config from '../../config/test';

test('updateTalkProgress: update successfully', async () => {
  const saga = updateTalkProgress({ payload: { id: 1, progress: 'entried' } });

  const ret = saga.next();
  expect(ret.value).toEqual(await call(patchTalkProgress, 1, 'entried'));

  expect(saga.next()).toEqual({ done: true, value: undefined });
});

test('updateTalkProgress: update fails', async () => {
  const saga = updateTalkProgress({ payload: { id: 1, progress: 'entried' } });

  let ret = saga.next();
  expect(ret.value).toEqual(await call(patchTalkProgress, 1, 'entried'));

  ret = saga.next({ status: 404 });

  expect(saga.next()).toEqual({ done: true, value: undefined });
});

jest.mock('axios', () => ({
  patch: jest.fn(() => Promise.resolve({ status: 200 })),
}));

test('patchTalkProgress', async () => {
  const talkId = 1;
  const params = { progress: 'oneFifths' };
  const url = `${config.API_HOST}/api/talks/${talkId}/progress`;
  await patchTalkProgress(talkId, 'oneFifths');
  expect(axios.patch).toHaveBeenCalledWith(url, params);
});
