import { toggleSignUp, signUpTalk, closeSignUp, setRoomName, getRoomName } from '../../rooms/actions/headers';

test('signUpTalk action', () => {
  expect(signUpTalk()).toEqual({ type: 'SIGN_UP_TALK' });
});

test('closeSignUp action', () => {
  expect(closeSignUp()).toEqual({ type: 'CLOSE_SIGN_UP' });
});

test('toggleSignUp open -> close', () => {
  expect(toggleSignUp('open')).toEqual({ type: 'CLOSE_SIGN_UP' });
});

test('toggleSignUp close -> open', () => {
  expect(toggleSignUp('close')).toEqual({ type: 'SIGN_UP_TALK' });
});

test('setRoomName', () => {
  expect(setRoomName('yay')).toEqual({ type: 'SET_ROOM_NAME', room: 'yay' });
});

test('getRoomName', () => {
  expect(getRoomName()).toEqual({ type: 'GET_ROOM_NAME' });
});
