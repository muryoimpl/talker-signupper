import Immutable from 'immutable';

import timer from '../../rooms/reducers/timer';

test('OPEN_TIMER', () => {
  const initialState = Immutable.Record({ open: false })();
  expect(timer(initialState, { type: 'OPEN_TIMER' })).toEqual(initialState.merge({ open: true }));
});

test('CLOSE_TIMER', () => {
  const initialState = Immutable.Record({ open: true })();
  expect(timer(initialState, { type: 'CLOSE_TIMER' })).toEqual(initialState.merge({ open: false }));
});
