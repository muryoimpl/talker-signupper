import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import Dialog from '../../../rooms/components/Dialog';

const mockStore = configureStore();

test.skip('show dialog', (t) => {
  const initialState = { dialogs: { isDisplay: false, message: 'error!' } };
  const store = mockStore(initialState);

  const close = sinon.mock(document).expects('querySelector').withArgs('dialog');
  const showModal = sinon.mock(document, 'querySelector').withArgs('dialog').expects('showModal'); // TODO

  const wrapper = mount(<Provider store={store}><Dialog /></Provider>);
  wrapper.find('#dialog-toggle').simulate('change', { target: { value: 'true' } });

  t.is(close.verify(), true);
  t.is(showModal.verify(), true);
});

//  test('hide dialog', (t) => {
//   const initialState = { dialogs: { isDisplay: false, message: '' } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><Dialog /></Provider>);
//
//   t.is(wrapper.find('#dialog-toggle').value, 'false');
// });


// test('hide form when signup is `close`', (t) => {
//   const initialState = { headers: { signup: 'close' }, signups: { submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   t.is(wrapper.find('.show').length, 0);
//   t.is(wrapper.find('.hidden').length, 1);
// });
//
// test('call changeTitle when title is changed', (t) => {
//   const initialState = { headers: { signup: 'close' }, signups: { title: '', talker_name: '', submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   wrapper.find('#signup-title').simulate('change', { target: { value: 'hi' } });
//   const actions = store.getActions();
//   t.deepEqual(actions, [{ type: 'CHANGE_TITLE', title: 'hi' }]);
// });
//
// test('call changeName when name is changed', (t) => {
//   const initialState = { headers: { signup: 'close', submitted: false }, signups: { title: '', talker_name: '', submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   wrapper.find('#signup-name').simulate('change', { target: { value: 'Ken' } });
//   const actions = store.getActions();
//   t.deepEqual(actions, [{ type: 'CHANGE_NAME', talker_name: 'Ken' }]);
// });
//
// test('call handleClickSignUp when signup button is clicked', (t) => {
//   const initialState = { headers: { signup: 'close', submitted: false }, signups: { title: 'hi', talker_name: 'Ken', submitted: false } };
//   const store = mockStore(initialState);
//   const wrapper = mount(<Provider store={store}><SignUp /></Provider>);
//
//   wrapper.find('#signup').simulate('click');
//   const actions = store.getActions();
//   t.deepEqual(actions, [{ type: 'REGISTER_SIGNUPPER_TALK' }]);
// });
