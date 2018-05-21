import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';

import Talks from '../Talks';
import NoEntry from '../presentationals/NoEntry';
import Entries from '../presentationals/Entries';
import Done from '../presentationals/Done';

const mockStore = configureStore();
// prevent App.talks and App.cable.subscriptions.create from operating anything
global.App = { talks: null, cable: { subscriptions: { create: (_a, _b) => [_a, _b] } } };

test('Show loading', () => {
  const initialState = { talks: { loading: true, entries: new Immutable.List() } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Talks name={'aaaa'} /></Provider>);

  expect(
    wrapper.contains(<div id="spinner" className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" />),
  ).toBe(true);
});

test('Show noEntry component', () => {
  const initialState = { talks: { loading: false, entries: new Immutable.List() } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Talks name={'aaaa'} /></Provider>);

  expect(wrapper.contains(<NoEntry />)).toBe(true);
});

test('Show entries talk', () => {
  const entry = new Immutable.Map({ id: 1, talker_name: 'muryoimpl', title: 'hi' });
  const initialState = { talks: { loading: false, entries: new Immutable.List([entry]), done: new Immutable.List() } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Talks name={'aaaa'} /></Provider>);

  expect(
    wrapper.contains(
      <div>
        <Entries entries={initialState.talks.entries} />
      </div>,
    ),
  ).toBe(true);
});

test('Show done talk', () => {
  const done = new Immutable.Map({ id: 1, talker_name: 'muryoimpl', title: 'hi', progress: 'done' });
  const initialState = { talks: { loading: false, entries: new Immutable.List([]), done: new Immutable.List([done]) } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Talks name={'aaaa'} /></Provider>);

  expect(
    wrapper.contains(
      <div>
        <Entries entries={initialState.talks.entries} />
        <Done done={initialState.talks.done} />
      </div>,
    ),
  ).toBe(true);
});

test('Show entries and done', () => {
  const entry = new Immutable.Map({ id: 1, talker_name: 'muryoimpl', title: 'hi', progress: 'entried' });
  const done = new Immutable.Map({ id: 2, talker_name: 'muryoimpl', title: 'hi2', progress: 'done' });
  const initialState = { talks: { loading: false, entries: new Immutable.List([entry]), done: new Immutable.List([done]) } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Talks name={'aaaa'} /></Provider>);
  expect(
    wrapper.contains(
      <div>
        <Entries entries={initialState.talks.entries} />
        <hr className="p-room__hr" />
        <Done done={initialState.talks.done} />
      </div>,
    ),
  ).toBe(true);
});
