import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import Signup from '../Signup';

const mockStore = configureStore();

test('call changeTitle when title is changed', () => {
  const initialState = { headers: { signup: 'close' }, signups: { open: true, title: '', talkerName: '', submitted: false } };

  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Signup /></Provider>);

  wrapper.find('input#signup-title').simulate('change', { target: { value: 'hi' } });
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CHANGE_TITLE', title: 'hi' }]);
});

test('call changeName when name is changed', () => {
  const initialState = { headers: { signup: 'close', submitted: false }, signups: { open: true, title: '', talkerName: '', submitted: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Signup /></Provider>);

  wrapper.find('input#signup-name').simulate('change', { target: { value: 'Ken' } });
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CHANGE_NAME', talkerName: 'Ken' }]);
});

test('call handleClickSignUp when signup button is clicked', () => {
  const response = new Immutable.Map({ status: 201, errors: null });
  const initialState = { headers: { roomName: 'aaaa' }, signups: { open: false, title: 'hi', talkerName: 'Ken', submitted: false, response } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Signup /></Provider>);

  wrapper.find('#signup').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'REGISTER_SIGNUPPER_TALK' }]);
});

test('Click close button', () => {
  const initialState = { headers: { roomName: 'aaaa' }, signups: { open: true, title: 'hi', talkerName: 'Ken', submitted: false, response: null } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Signup /></Provider>);

  wrapper.find('button.c-dialog__close').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CLEAR_SIGNUP_STATE' }]);
});

test('Show errors', () => {
  const initialState = {
    headers: { roomName: 'aaaa' },
    signups: {
      response: Immutable.Map({ errors: ['error has occurred'] }),
      open: true,
      title: 'hi',
      talkerName: 'Ken',
      submitted: false,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Signup /></Provider>);

  console.log(wrapper.html());
  expect(wrapper.find('p.error').text()).toEqual('error has occurred');
});
