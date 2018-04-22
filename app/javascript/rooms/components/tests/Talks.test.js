import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { TransitionGroup } from 'react-transition-group';

import Talks from '../Talks';
import NoEntry from '../presentationals/NoEntry';
import TalksGroup from '../presentationals/TalksGroup';
import Talk from '../Talk';

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

test('Show talk', () => {
  const entry = new Immutable.Map({ id: 1, talker_name: 'muryoimpl', title: 'hi' });
  const initialState = { talks: { loading: false, entries: new Immutable.List([entry]), done: new Immutable.List() } };
  const store = mockStore(initialState);
  const wrapper = mount(<Provider store={store}><Talks name={'aaaa'} /></Provider>);

  expect(
    wrapper.contains(
      <div>
        <TransitionGroup>
          {initialState.talks.entries.map((talk, i) => (
            <TalksGroup timeout={300} key={`talk-group-${talk.get('id')}`}>
              <Talk talk={talk} key={talk.get('id')} i={i} />
            </TalksGroup>
          ))}
        </TransitionGroup>
      </div>,
    ),
  ).toBe(true);
});
