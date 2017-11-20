import React from 'react';
import { shallow } from 'enzyme';
import { CSSTransition } from 'react-transition-group';

import TalksGroup from '../../../rooms/components/TalksGroup';

test('children and props are reflected', () => {
  const wrapper = shallow(<TalksGroup timeout={100}><p>hi</p></TalksGroup>);

  expect(
    wrapper.containsMatchingElement(
      <CSSTransition timeout={100} classNames="p-talk-entry">
        <p>hi</p>
      </CSSTransition>,
    ),
  ).toBe(true);
});
