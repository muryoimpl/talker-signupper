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

test('LOADING', () => {
  const initialState = Immutable.Record({ entries: [], loading: true })();
  expect(talks(initialState, { type: 'LOADING', loading: false })).toEqual(initialState.merge({ loading: false }));
});

test('SHUFFLE_ORDER', () => {
  const initialState = Immutable.Record({ entries: [], loading: false })();
  expect(talks(initialState, { type: 'SHUFFLE_ORDER' })).toEqual(initialState);
});
