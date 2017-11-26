import { fetchTalks, setTalks, loading, shuffleOrder } from '../../rooms/actions/talks';

test('fetchTalks action', () => {
  expect(fetchTalks()).toEqual({ type: 'FETCH_TALKS' });
});

test('setTalks action', () => {
  const talks = [{ id: 1, talkerName: 'impl', title: 'hi', room_id: 1 }];
  expect(setTalks(talks)).toEqual({ type: 'SET_TALKS', entries: talks });
});

test('loading action', () => {
  expect(loading(true)).toEqual({ type: 'LOADING', loading: true });
});

test('shuffleOrder action', () => {
  expect(shuffleOrder()).toEqual({ type: 'SHUFFLE_ORDER' });
});
