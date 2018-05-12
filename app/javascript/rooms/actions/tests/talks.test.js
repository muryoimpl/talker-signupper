import {
  fetchTalks,
  setTalks,
  loading,
  shuffleOrder,
  requestProgressUpdate,
  updateProgress,
} from '../talks';

test('fetchTalks action', () => {
  expect(fetchTalks()).toEqual({ type: 'FETCH_TALKS' });
});

test('setTalks action', () => {
  const talks = [{ id: 1, talkerName: 'impl', title: 'hi', room_id: 1 }];
  expect(setTalks(talks)).toEqual({ type: 'SET_TALKS', payload: { talks } });
});

test('loading action', () => {
  expect(loading(true)).toEqual({ type: 'LOADING', loading: true });
});

test('shuffleOrder action', () => {
  expect(shuffleOrder()).toEqual({ type: 'SHUFFLE_ORDER' });
});

test('requestProgressUpdate action', () => {
  expect(
    requestProgressUpdate(1, 'fourFifths'),
  ).toEqual({
    type: 'REQUEST_PROGRESS_UPDATE',
    payload: { id: 1, progress: 'fourFifths' },
  });
});

test('updateProgress action', () => {
  expect(
    updateProgress(1, 'fourFifths'),
  ).toEqual({
    type: 'UPDATE_PROGRESS',
    payload: { id: 1, progress: 'fourFifths' },
  });
});
