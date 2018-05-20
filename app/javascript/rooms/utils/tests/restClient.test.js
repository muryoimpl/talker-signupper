import axios from 'axios';
import { get, post, patch } from '../restClient';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ status: 200 })),
  post: jest.fn(() => Promise.resolve({ status: 201 })),
  patch: jest.fn(() => Promise.resolve({ status: 200 })),
}));

test('get: body is blank', async () => {
  const url = 'http://example.com/api/rooms';
  await get(url);
  expect(axios.get).toHaveBeenCalledWith(url);
});

test('get: body is present', async () => {
  const url = 'http://example.com/api/rooms';
  const body = { id: 1 };
  await get(url, body);
  expect(axios.get).toHaveBeenCalledWith(url, { params: body });
});

test('post', async () => {
  const url = 'http://example.com/api/rooms';
  const body = { title: 'hi', talkerName: 'ken' };
  await post(url, body);
  expect(axios.post).toHaveBeenCalledWith(url, body);
});

test('patch', async () => {
  const url = 'http://example.com/api/rooms';
  const body = { title: 'hi', talkerName: 'ken' };
  await patch(url, body);
  expect(axios.patch).toHaveBeenCalledWith(url, body);
});
