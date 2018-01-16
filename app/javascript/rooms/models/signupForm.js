import Immutable from 'immutable';

const SignupFormBase = Immutable.Record({
  title: '',
  talkerName: '',
  response: null,
  submitted: false,
  open: false,
});

export default class SignupForm extends SignupFormBase {
}
