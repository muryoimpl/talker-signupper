import Immutable from 'immutable';

import talks from '../talks';
import Talk from '../../models/talk';

test('FETCH_TALKS', () => {
  const initialState = Immutable.Record({ entries: [] })();
  expect(talks(initialState, { type: 'FETCH_TALKS' })).toEqual(initialState);
});

test('SET_TALKS: only entried', () => {
  const initialState = Immutable.Record({ entries: new Immutable.List(), done: new Immutable.List() })();
  const entryTalks = [{ id: 1, title: 'hi', talkerName: 'impl', room_id: 1 }];

  expect(
    talks(initialState, { type: 'SET_TALKS', payload: { talks: entryTalks } }),
  ).toEqual(
    initialState.merge({ entries: entryTalks, done: [] }),
  );
});

test('SET_TALKS: includes done', () => {
  const initialState = Immutable.Record({ entries: new Immutable.List(), done: new Immutable.List() })();
  const entryTalks = [{ id: 1, title: 'hi', talkerName: 'impl', room_id: 1, progress: 'done' }];

  expect(
    talks(initialState, { type: 'SET_TALKS', payload: { talks: entryTalks } }),
  ).toEqual(
    initialState.merge({ entries: [], done: entryTalks }),
  );
});

test('ADD_TALK', () => {
  const initialState = Immutable.Record({ entries: new Immutable.List(), done: new Immutable.List() })();
  const entry = Immutable.Map({ id: 1, title: 'hi', talkerName: 'impl', room_id: 1 });

  expect(
    talks(initialState, { type: 'ADD_TALK', talk: entry }),
  ).toEqual(
    initialState.merge({ entries: [entry], done: [] }),
  );
});

test('LOADING', () => {
  const initialState = Immutable.Record({ entries: [], loading: true })();
  expect(talks(initialState, { type: 'LOADING', loading: false })).toEqual(initialState.merge({ loading: false }));
});

test('NEXT_TALK', () => {
  const entry = Immutable.Map({ id: 1, title: 'hi', talkerName: 'impl', room_id: 1 });
  const initialState = Immutable.Record({ entries: new Immutable.List([entry]), done: new Immutable.List() })();

  expect(
    talks(initialState, { type: 'NEXT_TALK' }),
  ).toEqual(
    initialState.merge({ entries: [], done: [entry] }),
  );
});

test('PUSH_TO_CURRENT', () => {
  const entry = { title: 'hi', talkerName: 'impl', id: 1 };
  const initialState = Immutable.Record({ current: null, entries: new Immutable.List(), done: new Immutable.List() })();

  expect(
    talks(initialState, { type: 'PUSH_TO_CURRENT', payload: entry }),
  ).toEqual(
    initialState.merge({ current: entry }),
  );
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

test('unknown type', () => {
  const initialState = new Talk();
  expect(talks(undefined, { type: 'SHUFFLE_ORDER' })).toEqual(initialState);
});
