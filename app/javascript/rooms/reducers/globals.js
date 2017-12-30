import Global from '../models/global';
import * as Types from '../constants/actions';

export default function globals(global = new Global(), action) {
  switch (action.type) {
    case Types.CHANGE_SOCKET_STATE:
      return global.merge({ connected: action.connected });
    default:
      return global;
  }
}
