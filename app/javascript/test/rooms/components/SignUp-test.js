import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
// import sinon from 'sinon';

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

test('call changeTitle when title is changed', (t) => {
  const initialState = { headers: { signup: 'close' }, signups: { title: '', name: '' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup-title').simulate('change', { target: { value: 'hi' } });
  const actions = store.getActions();
  t.deepEqual(actions, [{ type: 'CHANGE_TITLE', title: 'hi' }]);
});

test('call changeName when name is changed', (t) => {
  const initialState = { headers: { signup: 'close' }, signups: { title: '', name: '' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup-name').simulate('change', { target: { value: 'Ken' } });
  const actions = store.getActions();
  t.deepEqual(actions, [{ type: 'CHANGE_NAME', name: 'Ken' }]);
});

test('call handleClickSignUp when signup button is clicked', (t) => {
  const initialState = { headers: { signup: 'close' }, signups: { title: 'hi', name: 'Ken' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup').simulate('click');
  const actions = store.getActions();
  t.deepEqual(actions, [{ type: 'REGISTER_SIGNUPPER_TALK' }]);
});
