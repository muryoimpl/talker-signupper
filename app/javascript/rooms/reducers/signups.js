import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({ title: '', talker_name: '' })();

export default function signups(state = initialState, action) {
  switch (action.type) {
    case Types.REGISTER_SIGNUPPER_TALK:
      return state;
    case Types.CHANGE_TITLE:
      return state.merge({ title: action.title });
    case Types.CHANGE_NAME:
      return state.merge({ title: action.talker_name });
    default:
      return state;
  }
}
