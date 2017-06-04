import test from 'ava';
import { take, call, select, put } from 'redux-saga/effects';
import nock from 'nock';

import * as Types from '../../rooms/constants/actions';
import { fetchTalksByRoom, fetchTalks, getHeaders } from '../../rooms/sagas/fetchTalks';
import * as talksActions from '../../rooms/actions/talks';
import * as dialogsActions from '../../rooms/actions/dialogs';

const getHeadersState = () => ({ headers: { roomName: 'aaaa', signup: true } });

test('registerSignuppersTalk: request success', async (t) => {
  const saga = fetchTalks();

  let ret = saga.next();
  t.deepEqual(ret.value, take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  t.deepEqual(ret.value, select(getHeaders));

  const getResponse = {
    status: 200,
    data: {
      status: 200,
      error: null,
      room: {
        id: 1,
        name: 'aaaa',
        created_at: '2017-05-05T11:00:00.000Z',
        updated_at: '2017-05-05T11:00:00.000Z',
        talks: [
          { title: 'hi', talker_name: 'Taro' },
          { title: 'hoi', talker_name: 'Jiro' },
        ],
      },
    },
  };

  nock('http://localhost:3000')
    .get('/api/rooms/aaaa')
    .reply(200, getResponse);

  ret = saga.next(getHeadersState().headers);
  t.deepEqual(ret.value, await call(fetchTalksByRoom, 'aaaa'));

  ret = saga.next(getResponse);
  t.deepEqual(ret.value, put(talksActions.setTalks(getResponse.data.room.talks)));
});

test('registerSignuppersTalk: request not found', async (t) => {
  const saga = fetchTalks();

  let ret = saga.next();
  t.deepEqual(ret.value, take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  t.deepEqual(ret.value, select(getHeaders));

  const getNotFoundResponse = {
    status: 404,
    data: {
      status: 404,
      error: 'room is not found',
      room: null,
    },
  };

  nock('http://localhost:3000')
    .get('/api/rooms/aaaa')
    .reply(404, getNotFoundResponse);

  ret = saga.next(getHeadersState().headers);
  t.deepEqual(ret.value, await call(fetchTalksByRoom, 'aaaa'));

  ret = saga.next(getNotFoundResponse);
  t.deepEqual(ret.value, put(dialogsActions.showDialog(getNotFoundResponse.data.error)));
});

test('registerSignuppersTalk: request occurs error', async (t) => {
  const saga = fetchTalks();

  let ret = saga.next();
  t.deepEqual(ret.value, take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  t.deepEqual(ret.value, select(getHeaders));

  const getErrorResponse = {
    status: 400,
    data: {
      status: 400,
      error: 'NoMethodError',
      room: null,
    },
  };

  nock('http://localhost:3000')
    .get('/api/rooms/aaaa')
    .reply(400, getErrorResponse);

  ret = saga.next(getHeadersState().headers);
  t.deepEqual(ret.value, await call(fetchTalksByRoom, 'aaaa'));

  ret = saga.next(getErrorResponse);
  t.deepEqual(ret.value, put(dialogsActions.showDialog(getErrorResponse.data.error)));
});
