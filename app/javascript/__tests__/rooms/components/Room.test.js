import React from 'react';
import { shallow } from 'enzyme';

// import Layout from '../../../rooms/components/Layout';
import Room from '../../../rooms/components/Room';

test('contains "hi"', () => {
  const wrapper = shallow(<Room />);
  expect(wrapper.contains(<p>hi</p>)).toBe(true);
});
