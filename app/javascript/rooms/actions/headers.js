import * as Types from '../constants/actions';

export function signUpTalk() {
  return { type: Types.SIGN_UP_TALK };
}

export function closeSignUp() {
  return { type: Types.CLOSE_SIGN_UP };
}

export function toggleSignUp(currentState) {
  return (state => ({
    close: signUpTalk(),
    open: closeSignUp(),
  })[state])(currentState);
}

export function setRoomName(roomName) {
  return { type: Types.SET_ROOM_NAME, room: roomName };
}
