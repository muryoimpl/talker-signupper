import Immutable from 'immutable';

import headers from '../../rooms/reducers/headers';

test('SIGN_UP_TALK', () => {
  const initialState = Immutable.Record({ signup: 'close' })();

  expect(headers(initialState, { type: 'SIGN_UP_TALK' })).toEqual(initialState.merge({ signup: 'open' }));
});

test('CLOSE_SIGN_UP', () => {
  const initialState = Immutable.Record({ signup: 'open' })();

  expect(headers(initialState, { type: 'CLOSE_SIGN_UP' })).toEqual(initialState.merge({ signup: 'close' }));
});

test('SET_ROOM_NAME', () => {
  const initialState = Immutable.Record({ signup: 'open', roomName: '' })();

  expect(headers(initialState, { type: 'SET_ROOM_NAME', room: 'yay' })).toEqual(initialState.merge({ roomName: 'yay' }));
});

test('GET_ROOM_NAME', () => {
  const initialState = Immutable.Record({ signup: 'open', roomName: 'Heya' })();

  expect(headers(initialState, { type: 'GET_ROOM_NAME' })).toEqual(initialState);
});
