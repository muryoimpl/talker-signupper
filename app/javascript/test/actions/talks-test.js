import test from 'ava';

import { fetchTalks, setTalks } from '../../rooms/actions/talks';

test('fetchTalks action', (t) => {
  t.deepEqual(fetchTalks(), { type: 'FETCH_TALKS' });
});

test('setTalks action', (t) => {
  const talks = [{ id: 1, talkerName: 'impl', title: 'hi', room_id: 1 }];
  t.deepEqual(setTalks(talks), { type: 'SET_TALKS', entries: talks });
});
