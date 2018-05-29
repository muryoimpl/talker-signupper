import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import MessageDialog from '../MessageDialog';
import DialogContent from '../presentationals/MessageDialogContent';

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

test('show dialog and click close button', () => {
  const closeAction = jest.fn();
  const showAction = jest.fn();
  const wrapper = mount(
    <DialogContent
      isDisplay={false}
      message="hi"
      handleClickClose={closeAction}
      handleShowDialog={showAction}
    />,
  );

  expect(closeAction.mock.calls.length).toEqual(0);
  expect(showAction.mock.calls.length).toEqual(0);

  wrapper.setProps({ message: 'hihihi', isDisplay: true });
  expect(closeAction.mock.calls.length).toEqual(0);
  expect(showAction.mock.calls.length).toEqual(1);

  wrapper.find('button.close').simulate('click');
  expect(closeAction.mock.calls.length).toEqual(1);
  expect(showAction.mock.calls.length).toEqual(1);
});

test('does not show dialog if only message is updated', () => {
  const closeAction = jest.fn();
  const showAction = jest.fn();
  const wrapper = mount(
    <DialogContent
      isDisplay={false}
      message="hi"
      handleClickClose={closeAction}
      handleShowDialog={showAction}
    />,
  );

  expect(closeAction.mock.calls.length).toEqual(0);
  expect(showAction.mock.calls.length).toEqual(0);

  wrapper.setProps({ message: 'hihihi' });
  expect(closeAction.mock.calls.length).toEqual(0);
  expect(showAction.mock.calls.length).toEqual(0);
});
