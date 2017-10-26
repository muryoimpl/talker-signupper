import * as Types from '../constants/actions';

export function setRoomName(roomName) {
  return { type: Types.SET_ROOM_NAME, room: roomName };
}

export function getRoomName() {
  return { type: Types.GET_ROOM_NAME };
}
