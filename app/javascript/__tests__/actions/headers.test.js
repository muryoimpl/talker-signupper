import { toggleSignUp, signUpTalk, closeSignUp, setRoomName, getRoomName } from '../../rooms/actions/headers';

test('setRoomName', () => {
  expect(setRoomName('yay')).toEqual({ type: 'SET_ROOM_NAME', room: 'yay' });
});

test('getRoomName', () => {
  expect(getRoomName()).toEqual({ type: 'GET_ROOM_NAME' });
});
