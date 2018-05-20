import { zeroPad, wait } from '../timer';

jest.useFakeTimers();

test('zeroPad: 1 digit', () => {
  expect(zeroPad(0)).toEqual('00');
});

test('zeroPad: 2 digit', () => {
  expect(zeroPad(11)).toEqual('11');
});

// NOTE: https://facebook.github.io/jest/docs/ja/timer-mocks.html
describe('wait', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test('wait', () => {
    wait(1).then(() => {});
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
