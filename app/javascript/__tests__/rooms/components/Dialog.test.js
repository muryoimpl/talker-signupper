import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Dialog from '../../../rooms/components/Dialog';

const mockStore = configureStore();

test('show error message', () => {
  const initialState = { dialogs: { isDisplay: true, message: 'error!' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Dialog /></Provider>);
  expect(wrapper.text()).toMatch(/error!/);
});

test('close dialog when clicking close button', () => {
  const initialState = { dialogs: { isDisplay: true, message: 'error!' } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Dialog /></Provider>);

  const closeMock = jest.fn();
  Object.defineProperty(document, 'querySelector', {
    value: () => ({
      close: closeMock,
    }),
  });

  wrapper.find('button.close').simulate('click');

  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CLOSE_DIALOG' }]);
  expect(closeMock.mock.calls.length).toEqual(1);
});
