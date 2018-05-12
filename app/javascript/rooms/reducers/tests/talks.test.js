import Immutable from 'immutable';

import talks from '../talks';

test('FETCH_TALKS', () => {
  const initialState = Immutable.Record({ entries: [] })();
  expect(talks(initialState, { type: 'FETCH_TALKS' })).toEqual(initialState);
});

test('SET_TALKS', () => {
  const initialState = Immutable.Record({ entries: new Immutable.List(), done: new Immutable.List() })();
  const entryTalks = [{ id: 1, title: 'hi', talkerName: 'impl', room_id: 1 }];

  expect(
    talks(initialState, { type: 'SET_TALKS', payload: { talks: entryTalks } }),
  ).toEqual(
    initialState.merge({ entries: entryTalks, done: [] }),
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

test('UPDATE_PROGRESS', () => {
  const firstEntry = Immutable.Map({
    id: 1, title: 'a', talker_name: 'a', order_number: 10, progress: 'fourFifths',
  });
  const entries = Immutable.List([firstEntry]);
  const initialState = Immutable.Record({ entries, loading: false })();

  expect(
    talks(initialState, { type: 'UPDATE_PROGRESS', payload: { id: 1, progress: 'entried' } }),
  ).toEqual(
    initialState.merge({
      entries: Immutable.List([firstEntry.merge({ progress: 'entried' })]),
    }),
  );
});
