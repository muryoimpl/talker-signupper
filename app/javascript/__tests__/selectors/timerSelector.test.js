import { minsSelector, secsSelector } from '../../rooms/selectors/timerSelector';

test('minsSelector: more than 60000 remaining', () => {
  const state = { remaining: 60001 };
  expect(minsSelector(state)).toEqual(1);
});

test('minsSelector: less than 60000 remaining', () => {
  const state = { remaining: 59999 };
  expect(minsSelector(state)).toEqual(0);
});

test('secsSelector: 0 remaining', () => {
  const state = { remaining: 0 };
  expect(secsSelector(state)).toEqual(0);
});

test('secsSelector: 1 remaining', () => {
  const state = { remaining: 1 };
  expect(secsSelector(state)).toEqual(1);
});

test('secsSelector: 999 remaining', () => {
  const state = { remaining: 999 };
  expect(secsSelector(state)).toEqual(1);
});

test('secsSelector: 59001 remaining', () => {
  const state = { remaining: 59001 };
  expect(secsSelector(state)).toEqual(0);
});

test('secsSelector: 58999 remaining', () => {
  const state = { remaining: 58999 };
  expect(secsSelector(state)).toEqual(59);
});
