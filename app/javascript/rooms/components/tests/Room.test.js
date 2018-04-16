import React from 'react';
import { shallow } from 'enzyme';

import Room from '../Room';

test.skip('contains "hi"', () => {
  const wrapper = shallow(<Room />);
  expect(wrapper.contains(<p>hi</p>)).toBe(true);
});
