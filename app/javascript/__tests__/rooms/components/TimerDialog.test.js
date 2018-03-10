import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import TimerDialog from '../../../rooms/components/TimerDialog';

const mockStore = configureStore();

test('Timer', () => {
  const initialState = { timer: { open: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);

  expect(
    wrapper.contains('05:00'),
  ).toBe(true);
});

test('Timer', () => {
  const initialState = { timer: { open: true } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);

  wrapper.find('button.c-dialog__close').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CLOSE_TIMER' }]);
});
