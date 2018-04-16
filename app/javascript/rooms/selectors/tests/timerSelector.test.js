import { timeSelector } from '../timerSelector';

test('timeSelector: more than 60000 remaining', () => {
  const state = { remaining: 60001 };
  expect(timeSelector(state)).toEqual([1, 1]);
});

test('timeSelector: 0 remaining', () => {
  const state = { remaining: 0 };
  expect(timeSelector(state)).toEqual([0, 0]);
});

test('timeSelector: 1 remaining', () => {
  const state = { remaining: 1 };
  expect(timeSelector(state)).toEqual([0, 1]);
});

test('timeSelector: 999 remaining', () => {
  const state = { remaining: 999 };
  expect(timeSelector(state)).toEqual([0, 1]);
});

test('timeSelector: 59001 remaining', () => {
  const state = { remaining: 59001 };
  expect(timeSelector(state)).toEqual([1, 0]);
});

test('timeSelector: 58999 remaining', () => {
  const state = { remaining: 58999 };
  expect(timeSelector(state)).toEqual([0, 59]);
});
