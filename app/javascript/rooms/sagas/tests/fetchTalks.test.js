import { take, call, select, put } from 'redux-saga/effects';
import nock from 'nock';
import axios from 'axios';

import * as Types from '../../constants/actions';
import { fetchTalksByRoom, fetchTalks, getHeaders, getAllState } from '../fetchTalks';
import * as talksActions from '../../actions/talks';
import * as dialogsActions from '../../actions/dialogs';
import config from '../../config/test';

const getHeadersState = () => ({ headers: { roomName: 'aaaa', signup: true } });

test('registerSignuppersTalk: request success', async () => {
  const saga = fetchTalks();

  let ret = saga.next();
  expect(ret.value).toEqual(take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  expect(ret.value).toEqual(select(getHeaders));

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
  expect(ret.value).toEqual(await call(fetchTalksByRoom, 'aaaa'));

  ret = saga.next(getResponse);
  expect(ret.value, put(talksActions.setTalks(getResponse.data.room.talks)));

  ret = saga.next();
  expect(ret.value, put(talksActions.loading(false)));
});

test('registerSignuppersTalk: request not found', async () => {
  const saga = fetchTalks();

  let ret = saga.next();
  expect(ret.value).toEqual(take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  expect(ret.value).toEqual(select(getHeaders));

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
  expect(ret.value).toEqual(await call(fetchTalksByRoom, 'aaaa'));

  ret = saga.next(getNotFoundResponse);
  expect(ret.value).toEqual(put(dialogsActions.showDialog(getNotFoundResponse.data.error)));

  ret = saga.next();
  expect(ret.value, put(talksActions.loading(false)));
});

test('registerSignuppersTalk: request occurs error', async () => {
  const saga = fetchTalks();

  let ret = saga.next();
  expect(ret.value).toEqual(take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  expect(ret.value).toEqual(select(getHeaders));

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
  expect(ret.value).toEqual(await call(fetchTalksByRoom, 'aaaa'));

  ret = saga.next(getErrorResponse);
  expect(ret.value).toEqual(put(dialogsActions.showDialog(getErrorResponse.data.error)));

  ret = saga.next();
  expect(ret.value, put(talksActions.loading(false)));
});

test('getAllState', () => {
  const state = { headers: { roomName: 'hi' }, globals: { connected: false } };
  expect(getAllState(state)).toEqual(state);
});

test('getHeaders', () => {
  const state = { headers: { roomName: 'hi' }, globals: { connected: false } };
  expect(getHeaders(state)).toEqual({ roomName: 'hi' });
});

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ status: 200 })),
}));

test('fetchTalksByRoom', async () => {
  const roomName = 'aaaa';
  const url = `${config.API_HOST}/api/rooms/${roomName}`;
  await fetchTalksByRoom(roomName);
  expect(axios.get).toHaveBeenCalledWith(url);
});
