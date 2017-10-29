import Immutable from 'immutable';

import headers from '../../rooms/reducers/headers';

test('SET_ROOM_NAME', () => {
  const initialState = Immutable.Record({ signup: 'open', roomName: '' })();

  expect(headers(initialState, { type: 'SET_ROOM_NAME', room: 'yay' })).toEqual(initialState.merge({ roomName: 'yay' }));
});

test('GET_ROOM_NAME', () => {
  const initialState = Immutable.Record({ signup: 'open', roomName: 'Heya' })();

  expect(headers(initialState, { type: 'GET_ROOM_NAME' })).toEqual(initialState);
});
