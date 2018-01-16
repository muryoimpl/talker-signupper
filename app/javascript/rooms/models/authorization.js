import Immutable from 'immutable';

const AuthorizationBase = Immutable.Record({
  password: '',
  submitted: false,
  authorized: false,
  response: null,
});

export default class Authorization extends AuthorizationBase {
}
