import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Header from '../../../rooms/components/Header';

const mockStore = configureStore();

test('contains "Talker SignUpper" link', (t) => {
  const initialState = { headers: { signup: 'open' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  t.true(wrapper.contains(<a className="text-like" href="/">Talker SignUpper</a>));
  t.regex(wrapper.render().text(), /sign up/);
});

test('show room name', (t) => {
  const initialState = { headers: { signup: 'open', roomName: 'Hi' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Header /></Provider>);

  t.true(wrapper.contains(<a className="text-like" href="/">Talker SignUpper</a>));
  t.regex(wrapper.render().text(), /Hi/);
});
