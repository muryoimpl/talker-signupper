import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
// import sinon from 'sinon';

import SignUp from '../../../rooms/components/SignUp';

const mockStore = configureStore();

test('show form when signup is `open`', () => {
  const initialState = { headers: { signup: 'open' }, signups: { submitted: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  expect(wrapper.find('.show').length).toEqual(1);
  expect(wrapper.find('.hidden').length).toEqual(0);
});

test('hide form when signup is `close`', () => {
  const initialState = { headers: { signup: 'close' }, signups: { submitted: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  expect(wrapper.find('.show').length).toEqual(0);
  expect(wrapper.find('.hidden').length).toEqual(1);
});

test('call changeTitle when title is changed', () => {
  const initialState = { headers: { signup: 'close' }, signups: { title: '', talker_name: '', submitted: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup-title').simulate('change', { target: { value: 'hi' } });
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CHANGE_TITLE', title: 'hi' }]);
});

test('call changeName when name is changed', () => {
  const initialState = { headers: { signup: 'close', submitted: false }, signups: { title: '', talker_name: '', submitted: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup-name').simulate('change', { target: { value: 'Ken' } });
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CHANGE_NAME', talker_name: 'Ken' }]);
});

test('call handleClickSignUp when signup button is clicked', () => {
  const initialState = { headers: { signup: 'close', submitted: false }, signups: { title: 'hi', talker_name: 'Ken', submitted: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'REGISTER_SIGNUPPER_TALK' }]);
});
