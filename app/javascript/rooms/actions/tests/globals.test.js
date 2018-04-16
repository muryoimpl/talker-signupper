import { changeSocketState } from '../globals';

test('changeSocketState action', () => {
  expect(changeSocketState(true)).toEqual({ type: 'CHANGE_SOCKET_STATE', connected: true });
});
