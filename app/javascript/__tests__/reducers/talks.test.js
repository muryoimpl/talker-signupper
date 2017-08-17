import Immutable from 'immutable';

import talks from '../../rooms/reducers/talks';

test('FETCH_TALKS', () => {
  const initialState = Immutable.Record({ entries: [] })();
  expect(talks(initialState, { type: 'FETCH_TALKS' })).toEqual(initialState);
});

test('SET_TALKS', () => {
  const initialState = Immutable.Record({ entries: new Immutable.List() })();
  const entryTalks = [{ id: 1, title: 'hi', talkerName: 'impl', room_id: 1 }];

  expect(
    talks(initialState, { type: 'SET_TALKS', entries: entryTalks }),
  ).toEqual(
    initialState.merge({ entries: entryTalks }),
  );
});
