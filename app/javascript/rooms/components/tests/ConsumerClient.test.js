import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ConsumerClient, { actionForReceivedJSON, mapDispatchToProps } from '../ConsumerClient';

const mockStore = configureStore();
global.App = { talks: null, cable: { subscriptions: { create: (_a, _b) => [_a, _b] } } };

test('render ConsumerClient', () => {
  const name = 'aaaa';
  const initialState = {};
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><ConsumerClient name={name} /></Provider>);

  expect(wrapper.text()).toEqual('');
  expect(global.App).not.toBeNull();
});

describe('actionForReceivedJSON', () => {
  test('create-talk', () => {
    const store = mockStore({});
    const response = { action: 'create-talk', talk: {} };
    actionForReceivedJSON(store.dispatch, response);
    expect(store.getActions()).toEqual([{ type: 'ADD_TALK', talk: {} }]);
  });

  test('shuffled-talks', () => {
    const store = mockStore({});
    const response = { action: 'shuffled-talks', room: { talks: {} } };
    actionForReceivedJSON(store.dispatch, response);
    expect(store.getActions()).toEqual([{ type: 'SET_TALKS', payload: { talks: {} } }]);
  });

  test('update-progress', () => {
    const store = mockStore({});
    const response = { action: 'update-progress', id: 1, progress: 'done' };
    actionForReceivedJSON(store.dispatch, response);
    expect(store.getActions()).toEqual([{ type: 'UPDATE_PROGRESS', payload: { id: 1, progress: 'done' } }]);
  });

  test('unknown', () => {
    const store = mockStore({});
    const response = { action: 'unknown' };
    actionForReceivedJSON(store.dispatch, response);
    expect(store.getActions()).toEqual([]);
  });
});

describe('mapDispatchToProps', () => {
  test('receiveJSON: it has error', () => {
    const store = mockStore({});
    const json = JSON.stringify({ error: 'hi, error' });
    mapDispatchToProps(store.dispatch).receiveJSON(json);
    expect(store.getActions()).toEqual([{ type: 'SHOW_DIALOG', message: 'hi, error' }]);
  });

  test('receiveJSON: it does not have error', () => {
    const store = mockStore({});
    const json = JSON.stringify({ action: 'update-progress', id: 1, progress: 'done' });
    mapDispatchToProps(store.dispatch).receiveJSON(json);
    expect(store.getActions()).toEqual([{ type: 'UPDATE_PROGRESS', payload: { id: 1, progress: 'done' } }]);
  });

  test('changeSocketState', () => {
    const store = mockStore({});
    mapDispatchToProps(store.dispatch).changeSocketState(true);
    expect(store.getActions()).toEqual([{ type: 'CHANGE_SOCKET_STATE', connected: true }]);
  });
});
