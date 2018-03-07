import Immutable from 'immutable';

import timer from '../../rooms/reducers/timer';

test('OPEN_TIMER', () => {
  const initialState = Immutable.Record({ open: false, title: '', talkerName: '' })();
  const payload = { title: 'hi', talkerName: 'KenKen' };
  expect(
    timer(initialState, { type: 'OPEN_TIMER', payload }),
  ).toEqual(
    initialState.merge({ open: true, title: 'hi', talkerName: 'KenKen' }),
  );
});

test('CLOSE_TIMER', () => {
  const initialState = Immutable.Record({ open: true, title: 'hi', talkerName: 'Ken' })();
  expect(
    timer(initialState, { type: 'CLOSE_TIMER', title: '', talkerName: '' }),
  ).toEqual(
    initialState.merge({ open: false, title: '', talkerName: '' }),
  );
});
