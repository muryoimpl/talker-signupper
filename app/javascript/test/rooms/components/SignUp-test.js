import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import SignUp from '../../../rooms/components/SignUp';

const mockStore = configureStore();

test('show form when signup is `open`', (t) => {
  const initialState = { headers: { signup: 'open' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  t.is(wrapper.find('.show').length, 1);
  t.is(wrapper.find('.hidden').length, 0);
});

test('hide form when signup is `close`', (t) => {
  const initialState = { headers: { signup: 'close' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  t.is(wrapper.find('.show').length, 0);
  t.is(wrapper.find('.hidden').length, 1);
});
