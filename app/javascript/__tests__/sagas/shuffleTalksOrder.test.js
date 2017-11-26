import { call, select, put } from 'redux-saga/effects';
import nock from 'nock';

import { shuffleTalksOrder, getShuffledTalks, getAllState } from '../../rooms/sagas/shuffleTalksOrder';
import * as talksActions from '../../rooms/actions/talks';
import * as dialogsActions from '../../rooms/actions/dialogs';

const getHeader = () => ({ headers: { roomName: 'aaaa', signup: true } });
const getState = () => Object.assign({}, getHeader());

test('shuffleTalksOrder: shuffle successes', async () => {
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(getShuffledTalks, getState().headers.roomName));

  const postResponse = {
    status: 200,
    data: {
      status: 200,
      error: null,
      action: 'shuffle',
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
    .post('/api/rooms/aaaa/shuffle')
    .reply(200, postResponse);

  ret = saga.next(postResponse);
  expect(ret.value).toEqual(put(talksActions.setTalks(postResponse.data.room.talks)));
});

test('shuffleTalksOrder: shuffle fails', async () => {
  const saga = shuffleTalksOrder();

  let ret = saga.next();
  expect(ret.value).toEqual(select(getAllState));

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(getShuffledTalks, getState().headers.roomName));

  const postResponse = {
    status: 400,
    data: {
      status: 400,
      error: 'Internal Server Error',
      action: 'shuffle',
      room: {
        id: 1,
        name: 'aaaa',
        created_at: '2017-05-05T11:00:00.000Z',
        updated_at: '2017-05-05T11:00:00.000Z',
        talks: [],
      },
    },
  };

  nock('http://localhost:3000')
    .post('/api/rooms/aaaa/shuffle')
    .reply(400, postResponse);

  ret = saga.next(postResponse);
  expect(ret.value).toEqual(put(dialogsActions.showDialog(postResponse.data.error)));
});
