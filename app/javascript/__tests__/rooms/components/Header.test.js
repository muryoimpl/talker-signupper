import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Header from '../../../rooms/components/Header';

const mockStore = configureStore();

test('contains "Talker SignUpper" link', () => {
  const initialState = { headers: { signup: 'open' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.contains(<a className="text-like" href="/">Talker SignUpper</a>)).toBe(true);
});

test('show room name', () => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  expect(wrapper.contains(<a className="text-like" href="/">Talker SignUpper</a>)).toBe(true);
  expect(wrapper.render().text()).toMatch(/Hi/);
});
