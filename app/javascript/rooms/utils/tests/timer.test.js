import { zeroPad } from '../timer';

test('zeroPad: 1 digit', () => {
  expect(zeroPad(0)).toEqual('00');
});

test('zeroPad: 2 digit', () => {
  expect(zeroPad(11)).toEqual('11');
});
