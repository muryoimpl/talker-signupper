import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Timer from '../../../rooms/components/Timer';

const mockStore = configureStore();

test('Timer', () => {
  const initialState = { timer: { open: false } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Timer /></Provider>);

  // TODO: ちゃんとした contents を表示するようにしたら、その内容でチェックする
  expect(
    wrapper.contains('TIMER'),
  ).toBe(true);
});

test('Timer', () => {
  const initialState = { timer: { open: true } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Timer /></Provider>);

  wrapper.find('button.c-dialog__close').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'CLOSE_TIMER' }]);
});
