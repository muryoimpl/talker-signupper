import Immutable from 'immutable';
import {
  fetchTalks,
  addTalk,
  setTalks,
  loading,
  shuffleOrder,
  nextTalk,
  pushToCurrent,
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

test('addTalk action', () => {
  const talk = { id: 1, talkerName: 'impl', title: 'hi', room_id: 1 };
  expect(addTalk(talk)).toEqual({ type: 'ADD_TALK', talk });
});

test('loading action', () => {
  expect(loading(true)).toEqual({ type: 'LOADING', loading: true });
});

test('shuffleOrder action', () => {
  expect(shuffleOrder()).toEqual({ type: 'SHUFFLE_ORDER' });
});

test('nextTalk action', () => {
  expect(nextTalk()).toEqual({ type: 'NEXT_TALK' });
});

test('pushToCurrent action', () => {
  const talk = Immutable.Map({ id: 1, talkerName: 'impl', title: 'hi', room_id: 1 });
  expect(pushToCurrent(talk)).toEqual({
    type: 'PUSH_TO_CURRENT',
    payload: { title: talk.get('title'), talkerName: talk.get('talker_name'), id: talk.get('id') },
  });
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
