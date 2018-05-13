import { openTimer, closeTimer, startTimer, stopTimer, setTimerId, updateRemaining, setPrevTime } from '../timer';

test('openTimer action', () => {
  expect(openTimer()).toEqual({ type: 'OPEN_TIMER' });
});

test('startTimer action', () => {
  expect(startTimer()).toEqual({ type: 'START_TIMER' });
});

test('stopTimer action', () => {
  expect(stopTimer()).toEqual({ type: 'STOP_TIMER' });
});

test('closeTimer action', () => {
  expect(closeTimer()).toEqual({ type: 'CLOSE_TIMER' });
});

test('setTimerId action', () => {
  const payload = { timerId: 100 };
  expect(setTimerId(100)).toEqual({ type: 'SET_TIMER_ID', payload });
});

test('updateRemaining action', () => {
  const payload = { remaining: 1000 };
  expect(updateRemaining(1000)).toEqual({ type: 'UPDATE_REMAINING', payload });
});

test('setPrevTime action', () => {
  const current = Date.now();
  const payload = { prevTime: current };
  expect(setPrevTime(current)).toEqual({ type: 'SET_PREV_TIME', payload });
});
