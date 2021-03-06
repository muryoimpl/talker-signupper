import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Header from '../Header';

const mockStore = configureStore();

test('contains "Talker Signupper" link', () => {
  const initialState = { headers: { signup: 'open' }, globals: { connected: false }, authorization: { authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.contains(<a className="text-like" href="/">Talker Signupper</a>)).toBe(true);
});

test('show room name', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' }, globals: { connected: false }, authorization: { authorized: false } };
  const store = mockStore(initialState);
  Object.defineProperty(window.location, 'href', { writable: false, value: 'http://localhost:3000/rooms/Hi' });
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.contains(<a className="text-like" href="/">Talker Signupper</a>)).toBe(true);
  expect(wrapper.contains(<a className="p-room__room-name-link" href="http://localhost:3000/rooms/Hi">#Hi</a>)).toBe(true);
});
