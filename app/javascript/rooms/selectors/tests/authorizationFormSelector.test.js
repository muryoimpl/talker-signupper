import authorizationFormSelector from '../authorizationFormSelector';

test('password more than 6 characters', () => {
  const state = { password: 'abcdef' };
  expect(authorizationFormSelector(state)).toEqual(true);
});

test('password less than 6 characters', () => {
  const state = { password: 'abcde' };
  expect(authorizationFormSelector(state)).toEqual(false);
});
