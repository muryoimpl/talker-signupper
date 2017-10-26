import Immutable from 'immutable';

const SignupFormBase = Immutable.Record({
  title: '',
  talker_name: '',
  response: null,
  submitted: false,
});

export default class SignupForm extends SignupFormBase {
}
