import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
// import sinon from 'sinon';

import SignUp from '../../../rooms/components/SignUp';

const mockStore = configureStore();

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
  const response = new Immutable.Map({ status: 201, errors: [] });
  const initialState = { headers: { submitted: false }, signups: { title: 'hi', talker_name: 'Ken', submitted: false, response } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><SignUp /></Provider>);

  wrapper.find('#signup').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'REGISTER_SIGNUPPER_TALK' }, { type: 'CHANGE_FORM_STATE', submitted: false }]);
});
