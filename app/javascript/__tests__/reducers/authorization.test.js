import Immutable from 'immutable';

import authorizations from '../../rooms/reducers/authorization';

test('CHANGE_PASSWORD', () => {
  const initialState = Immutable.Record({ password: '', submitted: false, authorized: false })();

  expect(
    authorizations(initialState, { type: 'CHANGE_PASSWORD', password: 'password0' }),
  ).toEqual(
    initialState.merge({ password: 'password0' }),
  );
});

test('CHANGE_PASSWORD_FORM_STATE', () => {
  const initialState = Immutable.Record({ password: '', submitted: false, authorized: false })();

  expect(
    authorizations(initialState, { type: 'CHANGE_PASSWORD_FORM_STATE', submitted: true }),
  ).toEqual(
    initialState.merge({ submitted: true }),
  );
});

test('CLEAR_PASSWORD', () => {
  const initialState = Immutable.Record({ password: 'aaaaaaaaa', submitted: false, authorized: false })();

  expect(
    authorizations(initialState, { type: 'CLEAR_PASSWORD' }),
  ).toEqual(
    initialState.merge({ password: '' }),
  );
});

test('AUTHORIZED', () => {
  const initialState = Immutable.Record({ password: '', submitted: false, authorized: false })();

  expect(
    authorizations(initialState, { type: 'AUTHORIZED', authorized: true }),
  ).toEqual(
    initialState.merge({ authorized: true }),
  );
});

test('STORE_AUTH_RESPONSE', () => {
  const initialState = Immutable.Record({ password: '', submitted: false, authorized: false, response: null })();

  expect(
    authorizations(initialState, { type: 'STORE_AUTH_RESPONSE', response: { status: 200 } }),
  ).toEqual(
    initialState.merge({ response: { status: 200 } }),
  );
});

test('CLEAR_AUTH_RESPONSE', () => {
  const initialState = Immutable.Record({ password: '', submitted: false, authorized: false, response: { status: 200 } })();

  expect(
    authorizations(initialState, { type: 'CLEAR_AUTH_RESPONSE' }),
  ).toEqual(
    initialState.merge({ response: null }),
  );
});
