import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import sinon from 'sinon';

import Authorization from '../../../rooms/components/Authorization';

const mockStore = configureStore();

// TODO: テスト書くぞ
test.skip('show Authorization dialog', () => {
  const initialState = { authorization: { title: '', talkerName: '', response: null, submitted: false } };
  const store = mockStore(initialState);

  const close = sinon.mock(document).expects('querySelector').withArgs('dialog#authorization-form');
  const showModal = sinon.mock(document, 'querySelector').withArgs('dialog#authorization-form').expects('showModal');

  const wrapper = mount(<Provider store={store}><Authorization /></Provider>);
  wrapper.find('#shuffle').simulate('change', { target: { value: 'true' } });

  expect(close.verify()).toBe(true);
  expect(showModal.verify()).toBe(true);
});
