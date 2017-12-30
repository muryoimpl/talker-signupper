import { changeSocketState } from '../../rooms/actions/globals';

test('changeSocketState action', () => {
  expect(changeSocketState(true)).toEqual({ type: 'CHANGE_SOCKET_STATE', connected: true });
});
