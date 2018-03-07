import { openTimer, closeTimer } from '../../rooms/actions/timer';

test('openTimer action', () => {
  const payload = { title: 'hi', talkerName: 'Ken' };
  expect(openTimer(payload)).toEqual({ type: 'OPEN_TIMER', payload });
});

test('closeTimer action', () => {
  expect(closeTimer()).toEqual({ type: 'CLOSE_TIMER' });
});
