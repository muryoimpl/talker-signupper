import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import { DEFAULT_REMAINING } from '../../models/timer';
import TimerDialog from '../TimerDialog';

const mockStore = configureStore();

test('Timer: show', () => {
  const initialState = {
    timer: {
      open: true,
      title: '',
      talkerName: '',
      timerId: null,
      remaining: DEFAULT_REMAINING,
      running: false,
    },
    talks: {
      entries: new Immutable.List(Immutable.Map({ title: 'hi', talkerName: 'heyman' })),
      current: Immutable.Map({ title: 'hi', talkerName: 'heyman' }),
    },
    globals: {
      connected: true,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);
  expect(wrapper.find('.p-timer__clock').text()).toMatch(/05:00/);

  const elements = wrapper.find('div.mdl-dialog__actions');
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button">Start</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Stop</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Reset</button>)).toBe(true);
});

test('Timer: disabled start button when WebSocket is disconnected', () => {
  const initialState = {
    timer: {
      open: true,
      title: '',
      talkerName: '',
      timerId: null,
      remaining: DEFAULT_REMAINING,
      running: false,
    },
    talks: {
      entries: new Immutable.List(Immutable.Map({ title: 'hi', talkerName: 'heyman' })),
      current: Immutable.Map({ title: 'hi', talkerName: 'heyman' }),
    },
    globals: {
      connected: false,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);
  expect(wrapper.find('.p-timer__clock').text()).toMatch(/05:00/);

  const elements = wrapper.find('div.mdl-dialog__actions');
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Start</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Stop</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Reset</button>)).toBe(true);
});

test('Timer: running', () => {
  const initialState = {
    timer: {
      open: true,
      title: '',
      talkerName: '',
      timerId: null,
      remaining: DEFAULT_REMAINING,
      running: true,
    },
    talks: {
      entries: new Immutable.List(Immutable.Map({ title: 'hi', talkerName: 'heyman' })),
      current: Immutable.Map({ title: 'hi', talkerName: 'heyman' }),
    },
    globals: {
      connected: true,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);
  expect(wrapper.find('.p-timer__clock').text()).toMatch(/05:00/);

  const elements = wrapper.find('div.mdl-dialog__actions');
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Start</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button">Stop</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button">Reset</button>)).toBe(true);
});

test('Timer: stopping', () => {
  const initialState = {
    timer: {
      open: true,
      title: '',
      talkerName: '',
      timerId: 100,
      remaining: DEFAULT_REMAINING,
      running: false,
    },
    talks: {
      entries: new Immutable.List(Immutable.Map({ title: 'hi', talkerName: 'heyman' })),
      current: Immutable.Map({ title: 'hi', talkerName: 'heyman' }),
    },
    globals: {
      connected: true,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);
  expect(wrapper.find('.p-timer__clock').text()).toMatch(/05:00/);

  const elements = wrapper.find('div.mdl-dialog__actions');
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button">Start</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button" disabled>Stop</button>)).toBe(true);
  expect(elements.containsMatchingElement(<button type="button" className="mdl-button">Reset</button>)).toBe(true);
});


test('Timer: click close button', () => {
  const initialState = {
    timer: {
      open: true,
      title: '',
      talkerName: '',
      timerId: null,
      remaining: DEFAULT_REMAINING,
      running: false,
    },
    talks: {
      entries: new Immutable.List(Immutable.Map({ title: 'hi', talkerName: 'heyman' })),
      current: Immutable.Map({ title: 'hi', talkerName: 'heyman' }),
    },
    globals: {
      connected: true,
    },
  };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><TimerDialog /></Provider>);

  wrapper.find('button.c-dialog__close').simulate('click');
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'STOP_TIMER' }, { type: 'CLEAR_TIMER' }, { type: 'CLOSE_TIMER' }]);
});
