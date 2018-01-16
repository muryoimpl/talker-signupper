import { put, call, select } from 'redux-saga/effects';
import nock from 'nock';

// import * as Types from '../../rooms/constants/actions';
import { registerSignuppersTalk, postTalk, getAllState, postEntry } from '../../rooms/sagas/requestForTalk';
import * as headerActions from '../../rooms/actions/headers';
import * as signupActions from '../../rooms/actions/signups';

const getSignup = () => ({ signups: { title: 'hi', talkerName: 'Ken' } });
const getHeader = () => ({ headers: { roomName: 'aaaa', signup: true } });
const getState = () => Object.assign({}, getSignup(), getHeader());
const createdResponse = {
  status: 201,
  data: {
    errors: [],
    talk: {
      id: 1,
      title: 'hi',
      talker_name: 'Ken',
      created_at: '2017-05-05T12:00:00.000Z',
      updated_at: '2017-05-05T12:00:00.000Z',
      room: {
        id: 1,
        name: 'aaaa',
        created_at: '2017-05-05T11:00:00.000Z',
        updated_at: '2017-05-05T11:00:00.000Z',
      },
    },
  },
};
const bad400Response = {
  status: 400,
  data: {
    errors: ['Title has already been taken'],
    talk: {
      id: 1,
      title: 'hi',
      talker_name: 'Ken',
      created_at: '2017-05-05T12:00:00.000Z',
      updated_at: '2017-05-05T12:00:00.000Z',
      room: {
        id: 1,
        name: 'aaaa',
        created_at: '2017-05-05T11:00:00.000Z',
        updated_at: '2017-05-05T11:00:00.000Z',
      },
    },
  },
};

test('registerSignuppersTalk: request success and cancel saga', async () => {
  const saga = registerSignuppersTalk();

  let ret = saga.next();
  expect(ret.value).toEqual(call(postEntry));

  ret = saga.next();
  expect(ret.value).toBeUndefined();
});

test('postEntry: request success', async () => {
  const saga = postEntry();

  let ret = saga.next();
  expect(ret.value).toEqual(put(signupActions.changeFormState(true)));

  ret = saga.next(getSignup());
  expect(ret.value).toEqual(put(headerActions.getRoomName()));

  ret = saga.next(Object.assign({}, getSignup(), { signups: { response: { status: 200 } } }));
  expect(ret.value).toEqual(put(signupActions.clearResponse()));

  ret = saga.next(getState());
  expect(ret.value).toEqual(select(getAllState));

  nock('http://localhost:3000')
    .post('/api/rooms/aaaa/talks', { talk: { title: 'hi', talker_name: 'Ken' } })
    .reply(201, createdResponse);

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(postTalk, 'aaaa', { title: 'hi', talkerName: 'Ken' }));

  ret = saga.next(createdResponse);
  expect(ret.value).toEqual(put(signupActions.storeResponse(createdResponse.data)));

  ret = saga.next();
  expect(ret.value).toEqual(put(signupActions.changeFormState(false)));

  ret = saga.next();
  expect(ret.value).toEqual(put(signupActions.updateDialogOpen(false)));

  ret = saga.next();
  expect(ret.value).toEqual(put(signupActions.clearSignupState()));

  ret = saga.next();
  expect(ret).toEqual({ done: true, value: undefined });
});

test('postEntry: request failed, returned 400', async () => {
  const saga = postEntry();

  let ret = saga.next();
  expect(ret.value).toEqual(put(signupActions.changeFormState(true)));

  ret = saga.next(getSignup());
  expect(ret.value).toEqual(put(headerActions.getRoomName()));

  ret = saga.next(Object.assign({}, getSignup(), { signups: { response: { status: 200 } } }));
  expect(ret.value).toEqual(put(signupActions.clearResponse()));

  ret = saga.next(getState());
  expect(ret.value).toEqual(select(getAllState));

  nock('http://localhost:3000')
    .post('/api/rooms/aaaa/talks', { talk: { title: 'hi', talker_name: 'Ken' } })
    .reply(400, bad400Response);

  ret = saga.next(getState());
  expect(ret.value).toEqual(await call(postTalk, 'aaaa', { title: 'hi', talkerName: 'Ken' }));

  ret = saga.next(bad400Response);
  expect(ret.value).toEqual(put(signupActions.storeResponse(bad400Response.data)));

  ret = saga.next();
  expect(ret.value).toEqual(put(signupActions.changeFormState(false)));

  ret = saga.next();
  expect(ret).toEqual({ done: true, value: undefined });
});
