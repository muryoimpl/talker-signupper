import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({})();

export default function rooms(state = initialState, action) {
  switch (action.type) {
    case Types.SHOW_ROOM:
      return state;
    default:
      return state;
  }
}
