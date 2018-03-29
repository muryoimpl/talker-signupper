import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';

import Talk from '../../../rooms/components/Talk';

test('show talk information', () => {
  const talkJSON = { id: 1, title: 'hi', talker_name: 'muryoimpl', room_id: 1 };
  const talk = new Immutable.Map(talkJSON);
  const wrapper = shallow(<Talk i={0} talk={talk} />);

  expect(
    wrapper.containsMatchingElement(
      <div className="p-talk-card mdl-card">
        <div className="p-talk-card__text mdl-card__supporting-text">
          <h3 className="p-talk-title">hi</h3>
          <div className="p-talk-talker">muryoimpl</div>
        </div>
      </div>,
    ),
  ).toBe(true);
});

test('show link to start talk if it is first talk', () => {
  const talkJSON = { id: 1, title: 'hi', talker_name: 'muryoimpl', room_id: 1 };
  const talk = new Immutable.Map(talkJSON);
  const wrapper = shallow(<Talk i={0} talk={talk} />);

  expect(
    wrapper.containsMatchingElement(
      <a href="#" className="p-talk-card-button__active mdl-color--indigo-500 mdl-color-text--white">
        <i className="material-icons">play_circle_filled</i>
      </a>,
    ),
  ).toBe(true);
});

test('show element which is not a link if it is not first talk', () => {
  const talkJSON = { id: 1, title: 'hi', talker_name: 'muryoimpl', room_id: 1 };
  const talk = new Immutable.Map(talkJSON);
  const wrapper = shallow(<Talk i={1} talk={talk} done={false} />);

  expect(
    wrapper.containsMatchingElement(
      <header className="p-talk-card-button mdl-color-text--white mdl-color--teal-100" />,
    ),
  ).toBe(true);
});

test('show element which is not a link if it is done', () => {
  const talkJSON = { id: 1, title: 'hi', talker_name: 'muryoimpl', room_id: 1 };
  const talk = new Immutable.Map(talkJSON);
  const wrapper = shallow(<Talk i={1} talk={talk} done />);

  expect(
    wrapper.containsMatchingElement(
      <header className="p-talk-card-button mdl-color-text--white mdl-color--grey-400" />,
    ),
  ).toBe(true);
});
