import signupFormSelector from '../signupFormSelector';

test('title and talkerName are present', () => {
  const state = { title: 'hi, world', talkerName: 'muryoimpl' };
  expect(signupFormSelector(state)).toEqual(true);
});

test('title and talkerName are blank', () => {
  const state = { title: '', talkerName: '' };
  expect(signupFormSelector(state)).toEqual(false);
});

test('title is blank', () => {
  const state = { title: '', talkerName: 'muryoimpl' };
  expect(signupFormSelector(state)).toEqual(false);
});

test('talkerName is blank', () => {
  const state = { title: 'hi, world', talkerName: '' };
  expect(signupFormSelector(state)).toEqual(false);
});
