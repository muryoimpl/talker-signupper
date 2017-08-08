import Header from '../models/header';
import * as Types from '../constants/actions';

export default function headers(header = new Header(), action) {
  switch (action.type) {
    case Types.CLOSE_SIGN_UP:
      return header.merge({ signup: 'close' });
    case Types.SIGN_UP_TALK:
      return header.merge({ signup: 'open' });
    case Types.SET_ROOM_NAME:
      return header.merge({ roomName: action.room });
    case Types.GET_ROOM_NAME:
    default:
      return header;
  }
}
