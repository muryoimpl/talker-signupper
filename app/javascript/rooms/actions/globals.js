import * as Types from '../constants/actions';

export function changeSocketState(isConnected) {
  return { type: Types.CHANGE_SOCKET_STATE, connected: isConnected };
}
