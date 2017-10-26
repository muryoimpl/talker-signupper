import Header from '../models/header';
import * as Types from '../constants/actions';

export default function headers(header = new Header(), action) {
  switch (action.type) {
    case Types.SET_ROOM_NAME:
      return header.merge({ roomName: action.room });
    case Types.GET_ROOM_NAME:
    default:
      return header;
  }
}
