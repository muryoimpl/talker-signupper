import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import MessageDialog from '../MessageDialog';

const mockStore = configureStore();

test('show error message', () => {
  const initialState = { dialogs: { isDisplay: true, message: 'error!' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><MessageDialog /></Provider>);
  expect(wrapper.text()).toMatch(/error!/);
});

test('close dialog when clicking close button', () => {
  const initialState = { dialogs: { isDisplay: true, message: 'error!' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><MessageDialog /></Provider>);
  wrapper.find('button.close').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CLOSE_DIALOG' }]);
});
