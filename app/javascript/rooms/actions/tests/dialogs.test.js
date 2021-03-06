import { showDialog, closeDialog } from '../dialogs';

test('showDialog action', () => {
  expect(showDialog('hi')).toEqual({ type: 'SHOW_DIALOG', message: 'hi' });
});

test('closeDialog action', () => {
  expect(closeDialog()).toEqual({ type: 'CLOSE_DIALOG' });
});
