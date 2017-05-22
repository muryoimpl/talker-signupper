import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({ title: '', talker_name: '', response: null, submitted: false })();

export default function signups(state = initialState, action) {
  switch (action.type) {
    case Types.CHANGE_TITLE:
      return state.merge({ title: action.title });
    case Types.CHANGE_NAME:
      return state.merge({ talker_name: action.talker_name });
    case Types.CLEAR_SIGNUP_STATE:
      return state.merge({ title: '', talker_name: '', response: null });
    case Types.STORE_RESPONSE:
      return state.merge({ response: action.response });
    case Types.CLEAR_RESPONSE:
      return state.merge({ response: null });
    case Types.CHANGE_FORM_STATE:
      return state.merge({ submitted: action.submitted });
    case Types.REGISTER_SIGNUPPER_TALK:
    default:
      return state;
  }
}
