import test from 'ava';
import Immutable from 'immutable';

import dialogs from '../../rooms/reducers/dialogs';

test('SHOW_DIALOG', (t) => {
  const initialState = Immutable.Record({ isDisplay: false, message: '' })();

  t.deepEqual(
    dialogs(initialState, { type: 'SHOW_DIALOG', message: 'hi' }),
    initialState.merge({ isDisplay: true, message: 'hi' }),
  );
});

test('CLOSE_DIALOG', (t) => {
  const initialState = Immutable.Record({ isDisplay: true, message: 'hi' })();

  t.deepEqual(
    dialogs(initialState, { type: 'CLOSE_DIALOG' }),
    initialState.merge({ isDisplay: false, message: '' }),
  );
});
