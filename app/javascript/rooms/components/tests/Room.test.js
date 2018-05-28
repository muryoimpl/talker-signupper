import React from 'react';
import { shallow } from 'enzyme';

import Room from '../Room';
import SignUp from '../Signup';
import Talks from '../Talks';
import AuthorizationDialog from '../AuthorizationDialog';
import ConsumerClient from '../ConsumerClient';


test('Room', () => {
  const matched = { params: { name: 'abcd' } };
  const wrapper = shallow(<Room match={matched} />);

  expect(wrapper.contains(<ConsumerClient name={matched.params.name} />)).toBe(true);
  expect(wrapper.contains(<SignUp />)).toBe(true);
  expect(wrapper.contains(<AuthorizationDialog />)).toBe(true);
  expect(wrapper.contains(<Talks name={matched.params.name} />)).toBe(true);
});
