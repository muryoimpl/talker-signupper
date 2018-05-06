import { call, put } from 'redux-saga/effects';

import { updateTalkProgress, patchTalkProgress } from '../updateTalkProgress';

test('updateTalkProgress: update successfully', async () => {
  const saga = updateTalkProgress({ payload: { talkId: 1, progress: 'entried' } });

  let ret = saga.next();
  expect(ret.value).toEqual(await call(patchTalkProgress, 1, 'entried'));

  ret = saga.next({ status: 200 });
  expect(ret.value).toEqual(put({ type: 'UPDATE_TALK_PROGRESS', payload: { id: 1, progress: 'entried' } }));

  expect(saga.next()).toEqual({ done: true, value: undefined });
});

test('updateTalkProgress: update fails', async () => {
  const saga = updateTalkProgress({ payload: { talkId: 1, progress: 'entried' } });

  let ret = saga.next();
  expect(ret.value).toEqual(await call(patchTalkProgress, 1, 'entried'));

  ret = saga.next({ status: 404 });

  expect(saga.next()).toEqual({ done: true, value: undefined });
});
