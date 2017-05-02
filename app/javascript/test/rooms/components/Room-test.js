import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

// import Layout from '../../../rooms/components/Layout';
import Room from '../../../rooms/components/Room';

test('contains "hi"', (t) => {
  const wrapper = shallow(<Room />);
  t.is(wrapper.contains(<p>hi</p>), true);
});
