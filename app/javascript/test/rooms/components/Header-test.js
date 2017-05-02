import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Header from '../../../rooms/components/Header';

const mockStore = configureStore();
const initialState = { headers: { signup: true } };

test('contains "Talker SignUpper" link', (t) => {
  const store = mockStore(initialState);
  const wrapper = shallow(<Header store={store} />);

  t.regex(wrapper.render().text(), /Talker SignUpper/);
  t.regex(wrapper.render().text(), /sign up/);
});
