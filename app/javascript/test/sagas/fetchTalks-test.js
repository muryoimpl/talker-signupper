import test from 'ava';
import { take, call, select } from 'redux-saga/effects';
import nock from 'nock';

import * as Types from '../../rooms/constants/actions';
import { fetchTalksByRoom, fetchTalks, getHeaders } from '../../rooms/sagas/fetchTalks';

const getResponse = {
  status: 201,
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
};

const getHeadersState = () => ({ headers: { roomName: 'aaaa', signup: true } });

test('registerSignuppersTalk: request success', async (t) => {
  const saga = fetchTalks();

  let ret = saga.next();
  t.deepEqual(ret.value, take(Types.FETCH_TALKS));

  ret = saga.next(getHeadersState());
  t.deepEqual(ret.value, select(getHeaders));

  nock('http://localhost:3000')
    .get('/api/rooms/aaaa')
    .reply(200, getResponse);

  ret = saga.next(getHeadersState().headers);
  t.deepEqual(ret.value, await call(fetchTalksByRoom, 'aaaa'));
});
