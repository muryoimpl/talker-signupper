import Immutable from 'immutable';

import timer from '../timer';

test('OPEN_TIMER', () => {
  const initialState = Immutable.Record({ open: false })();
  expect(
    timer(initialState, { type: 'OPEN_TIMER' }),
  ).toEqual(
    initialState.merge({ open: true }),
  );
});

test('CLOSE_TIMER', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken' })();
  expect(
    timer(initialState, { type: 'CLOSE_TIMER' }),
  ).toEqual(
    initialState.merge({ open: false, title: '', talkerName: '' }),
  );
});

test('SET_TIMER_ID', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken', timerId: null, remaining: 300000, running: false })();
  const payload = { timerId: 1000 };
  expect(
    timer(initialState, { type: 'SET_TIMER_ID', payload }),
  ).toEqual(
    initialState.merge({ timerId: 1000 }),
  );
});

test('UPDATE_REMAINING', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken', timerId: null, remaining: 300000, running: false })();
  const payload = { remaining: 1000 };
  expect(
    timer(initialState, { type: 'UPDATE_REMAINING', payload }),
  ).toEqual(
    initialState.merge({ remaining: 1000 }),
  );
});

test('CLEAR_TIMER', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken', timerId: 123, remaining: 300, running: true, prevTime: Date.now() })();
  expect(
    timer(initialState, { type: 'CLEAR_TIMER' }),
  ).toEqual(
    initialState.merge({ remaining: 300000, timerId: null, prevTime: null }),
  );
});

test('START_TIMER', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken', timerId: null, remaining: 300000, running: false })();
  expect(
    timer(initialState, { type: 'START_TIMER' }),
  ).toEqual(
    initialState.merge({ running: true }),
  );
});

test('STOP_TIMER', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken', timerId: 123, remaining: 300, running: true })();
  expect(
    timer(initialState, { type: 'STOP_TIMER' }),
  ).toEqual(
    initialState.merge({ running: false }),
  );
});

test('SET_PREV_TIME', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken', timerId: 123, remaining: 300, running: true, prevTime: null })();
  const current = Date.now();
  const payload = { prevTime: current };
  expect(
    timer(initialState, { type: 'SET_PREV_TIME', payload }),
  ).toEqual(
    initialState.merge({ prevTime: current }),
  );
});
