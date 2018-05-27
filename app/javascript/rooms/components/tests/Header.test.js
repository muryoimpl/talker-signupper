/* eslint-disable max-len */
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import Header from '../Header';

const mockStore = configureStore();
Object.defineProperty(window.location, 'href', { writable: false, value: 'http://localhost:3000/rooms/Hi' });
Object.defineProperty(window.location, 'pathname', { writable: false, value: '/rooms/Hi' });
const selector = sinon.stub(document, 'querySelector');
selector.returns({
  showModal: () => {},
});

test('contains "Talker Signupper" link', () => {
  const initialState = { headers: { signup: 'open' }, globals: { connected: false }, authorization: { authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.contains(<a className="text-like" href="/">Talker Signupper</a>)).toBe(true);
});

test('show room name and do not show buttons', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' }, globals: { connected: false }, authorization: { authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.contains(<a className="text-like" href="/">Talker Signupper</a>)).toBe(true);
  expect(wrapper.contains(<a className="p-room__room-name-link" href="http://localhost:3000/rooms/Hi">#Hi</a>)).toBe(true);
  expect(wrapper.find('#shuffle').html()).toEqual('<button id="shuffle" disabled="" class="mdl-button mdl-js-button mdl-button--raised p-header__shuffle">shuffle</button>');
  expect(wrapper.find('#signup').html()).toEqual('<button id="signup" disabled="" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">entry</button>');
  expect(wrapper.find('#leave').html()).toEqual('<button id="leave" disabled="" class="ml10 mdl-button mdl-js-button mdl-button--raised mdl-button--accent">leave this room</button>');
});

test('show buttons if websocket is connected', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' }, globals: { connected: true }, authorization: { authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.find('#shuffle').html()).toEqual('<button id="shuffle" class="mdl-button mdl-js-button mdl-button--raised p-header__shuffle">shuffle</button>');
  expect(wrapper.find('#signup').html()).toEqual('<button id="signup" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">entry</button>');
  expect(wrapper.find('#leave').html()).toEqual('<button id="leave" class="ml10 mdl-button mdl-js-button mdl-button--raised mdl-button--accent">leave this room</button>');
});

test('click shuffle button: already authorized', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' }, globals: { connected: true }, authorization: { authorized: true } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);
  wrapper.find('button#shuffle').simulate('click');

  const actions = store.getActions();
  expect(actions).toEqual([
    { type: 'SET_ROOM_NAME', room: 'Hi' },
    { type: 'LOADING', loading: true },
    { type: 'SHUFFLE_ORDER' },
    { type: 'LOADING', loading: false },
  ]);
});

test('click shuffle button: not authorized', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' }, globals: { connected: true }, authorization: { authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);
  wrapper.find('button#shuffle').simulate('click');

  const actions = store.getActions();
  expect(actions).toEqual([
    { type: 'SET_ROOM_NAME', room: 'Hi' },
  ]);
});

test('click entry button', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' }, globals: { connected: true }, authorization: { authorized: true } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);
  wrapper.find('button#signup').simulate('click');

  const actions = store.getActions();
  expect(actions).toEqual([
    { type: 'SET_ROOM_NAME', room: 'Hi' },
    { type: 'UPDATE_DIALOG_OPEN', open: true },
  ]);
});
