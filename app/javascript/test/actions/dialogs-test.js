import test from 'ava';

import { showDialog, closeDialog } from '../../rooms/actions/dialogs';

test('showDialog action', (t) => {
  t.deepEqual(showDialog('hi'), { type: 'SHOW_DIALOG', message: 'hi' });
});

test('closeDialog action', (t) => {
  t.deepEqual(closeDialog(), { type: 'CLOSE_DIALOG' });
});
