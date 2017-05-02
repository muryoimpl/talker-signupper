import test from 'ava';

import { toggleSignUp, signUpTalk, closeSignUp } from '../../rooms/actions/headers';

test('signUpTalk action', (t) => {
  t.deepEqual(signUpTalk(), { type: 'SIGN_UP_TALK' });
});

test('closeSignUp action', (t) => {
  t.deepEqual(closeSignUp(), { type: 'CLOSE_SIGN_UP' });
});

test('toggleSignUp open -> close', (t) => {
  t.deepEqual(
    toggleSignUp('open'),
    { type: 'CLOSE_SIGN_UP' },
  );
});

test('toggleSignUp close -> open', (t) => {
  t.deepEqual(
    toggleSignUp('close'),
    { type: 'SIGN_UP_TALK' },
  );
});
