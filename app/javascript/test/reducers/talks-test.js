import test from 'ava';
import Immutable from 'immutable';

import talks from '../../rooms/reducers/talks';

test('FETCH_TALKS', (t) => {
  const initialState = Immutable.Record({ entries: [] })();

  t.deepEqual(
    talks(initialState, { type: 'FETCH_TALKS' }),
    initialState,
  );
});

test('SET_TALKS', (t) => {
  const initialState = Immutable.Record({ entries: new Immutable.List() })();
  const entryTalks = [{ id: 1, title: 'hi', talkerName: 'impl', room_id: 1 }];

  t.deepEqual(
    talks(initialState, { type: 'SET_TALKS', entries: entryTalks }),
    initialState.merge({ entries: entryTalks }),
  );
});
