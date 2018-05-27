import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import Immutable from 'immutable';

import AuthorizationDialog from '../AuthorizationDialog';

const mockStore = configureStore();
// NOTE: http://thejoemorgan.com/2016/07/05/using-sinon-to-test-document-functions/
const selector = sinon.stub(document, 'querySelector');
selector.returns({
  showModal: () => {},
  getAttribute: () => '',
  close: () => {},
});

test('close Authorization dialog', () => {
  const initialState = { authorization: { title: '', talkerName: '', response: null, submitted: false, authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><AuthorizationDialog /></Provider>);
  wrapper.find('.c-dialog__close').simulate('click');

  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CLEAR_PASSWORD' }, { type: 'CLEAR_AUTH_RESPONSE' }]);
});

test('close dialog when it has already authorized', () => {
  const initialState = { authorization: { title: 'hi', talkerName: 'me', response: null, submitted: false, authorized: true } };
  const store = mockStore(initialState);
  mount(<Provider store={store}><AuthorizationDialog /></Provider>);

  const actions = store.getActions();
  expect(actions).toEqual([]);
});

test('include `p-authorization__form--inactive` class if submitted', () => {
  const initialState = { authorization: { title: 'hi', talkerName: 'me', response: null, submitted: true, authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><AuthorizationDialog /></Provider>);

  expect(wrapper.find('form.p-authorization__form--inactive').length).toEqual(1);
});

test('include `p-authorization__form--active` class if not submitted', () => {
  const initialState = { authorization: { title: 'hi', talkerName: 'me', response: null, submitted: false, authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><AuthorizationDialog /></Provider>);

  expect(wrapper.find('form.p-authorization__form--inactive').length).toEqual(0);
});

test('show `Password is incorrect` if respose status is 401', () => {
  const initialState = { authorization: { title: 'hi', talkerName: 'me', response: Immutable.Map({ status: 401 }), submitted: false, authorized: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><AuthorizationDialog /></Provider>);

  expect(wrapper.text()).toMatch(/Password is incorrect/);
});

test('click authorization button', () => {
  const initialState = {
    authorization: { password: 'aaaaaaa', title: 'hi', talkerName: 'me', response: Immutable.Map({ status: 200 }), submitted: false, authorized: true },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><AuthorizationDialog /></Provider>);
  wrapper.find('#authorization-button').simulate('click');

  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'SHUFFLE_ORDER' }]);
});

test('input password', () => {
  const initialState = {
    authorization: { password: '', title: 'hi', talkerName: 'me', response: null, submitted: false, authorized: false },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><AuthorizationDialog /></Provider>);
  wrapper.find('#password').simulate('change', { target: { value: 'aaa' } });

  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CHANGE_PASSWORD', password: 'aaa' }]);
});
