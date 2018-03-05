import { openTimer, closeTimer } from '../../rooms/actions/timer';

test('openTimer action', () => {
  expect(openTimer()).toEqual({ type: 'OPEN_TIMER' });
});

test('closeTimer action', () => {
  expect(closeTimer(true)).toEqual({ type: 'CLOSE_TIMER' });
});
