import Immutable from 'immutable';

import dialogs from '../dialogs';

test('SHOW_DIALOG', () => {
  const initialState = Immutable.Record({ isDisplay: false, message: '' })();

  expect(
    dialogs(initialState, { type: 'SHOW_DIALOG', message: 'hi' }),
  ).toEqual(
    initialState.merge({ isDisplay: true, message: 'hi' }),
  );
});

test('CLOSE_DIALOG', () => {
  const initialState = Immutable.Record({ isDisplay: true, message: 'hi' })();

  expect(dialogs(initialState, { type: 'CLOSE_DIALOG' })).toEqual(initialState.merge({ isDisplay: false, message: '' }));
});
