import Authorization from '../models/authorization';
import * as Types from '../constants/actions';

export default function authorizations(authorization = new Authorization(), action) {
  switch (action.type) {
    case Types.CHANGE_PASSWORD:
      return authorization.merge({ password: action.password });
    case Types.CHANGE_PASSWORD_FORM_STATE:
      return authorization.merge({ submitted: action.submitted });
    case Types.CLEAR_PASSWORD:
      return authorization.merge({ password: '' });
    case Types.AUTHORIZED:
      return authorization.merge({ authorized: action.authorized });
    case Types.STORE_AUTH_RESPONSE:
      return authorization.merge({ response: action.response });
    case Types.CLEAR_AUTH_RESPONSE:
      return authorization.merge({ response: null });
    default:
      return authorization;
  }
}
