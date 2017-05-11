import test from 'ava';
import Immutable from 'immutable';

import headers from '../../rooms/reducers/headers';

test('SIGN_UP_TALK', (t) => {
  const initialState = Immutable.Record({ signup: 'close' })();

  t.deepEqual(
    headers(initialState, { type: 'SIGN_UP_TALK' }),
    initialState.merge({ signup: 'open' }),
  );
});

test('CLOSE_SIGN_UP', (t) => {
  const initialState = Immutable.Record({ signup: 'open' })();

  t.deepEqual(
    headers(initialState, { type: 'CLOSE_SIGN_UP' }),
    initialState.merge({ signup: 'close' }),
  );
});

test('SET_ROOM_NAME', (t) => {
  const initialState = Immutable.Record({ signup: 'open', roomName: '' })();

  t.deepEqual(
    headers(initialState, { type: 'SET_ROOM_NAME', room: 'yay' }),
    initialState.merge({ roomName: 'yay' }),
  );
});

test('GET_ROOM_NAME', (t) => {
  const initialState = Immutable.Record({ signup: 'open', roomName: 'Heya' })();

  t.deepEqual(
    headers(initialState, { type: 'GET_ROOM_NAME' }),
    initialState,
  );
});
