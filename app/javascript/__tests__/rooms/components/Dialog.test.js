import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import Dialog from '../../../rooms/components/Dialog';

const mockStore = configureStore();
// TODO: テスト書くぞ
test.skip('show dialog', () => {
  const initialState = { dialogs: { isDisplay: false, message: 'error!' } };
  const store = mockStore(initialState);

  const close = sinon.mock(document).expects('querySelector').withArgs('dialog');
  const showModal = sinon.mock(document, 'querySelector').withArgs('dialog').expects('showModal');

  const wrapper = mount(<Provider store={store}><Dialog /></Provider>);
  wrapper.find('#dialog-toggle').simulate('change', { target: { value: 'true' } });

  expect(close.verify()).toBe(true);
  expect(showModal.verify()).toBe(true);
});

//  test('hide dialog', () => {
//   const initialState = { dialogs: { isDisplay: false, message: '' } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><Dialog /></Provider>);
//
//   expect(wrapper.find('#dialog-toggle').value).toBe('false');
// });


// test('hide form when signup is `close`', () => {
//   const initialState = { headers: { signup: 'close' }, signups: { submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   expect(wrapper.find('.show').length).toBe(0);
//   expect(wrapper.find('.hidden').length).toBe(1);
// });
//
// test('call changeTitle when title is changed', () => {
//   const initialState = { headers: { signup: 'close' }, signups: { title: '', talker_name: '', submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   wrapper.find('#signup-title').simulate('change', { target: { value: 'hi' } });
//   const actions = store.getActions();
//   expect(actions).toEqual([{ type: 'CHANGE_TITLE', title: 'hi' }]);
// });
//
// test('call changeName when name is changed', () => {
//   const initialState = { headers: { signup: 'close', submitted: false }, signups: { title: '', talker_name: '', submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   wrapper.find('#signup-name').simulate('change', { target: { value: 'Ken' } });
//   const actions = store.getActions();
//   expect(actions).toEqual([{ type: 'CHANGE_NAME', talker_name: 'Ken' }]);
// });
//
// test('call handleClickSignUp when signup button is clicked', () => {
//   const initialState = { headers: { signup: 'close', submitted: false }, signups: { title: 'hi', talker_name: 'Ken', submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   wrapper.find('#signup').simulate('click');
//   const actions = store.getActions();
//   expect(actions).toEqual([{ type: 'REGISTER_SIGNUPPER_TALK' }]);
// });
