import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({ entries: [] })();

export default function talks(state = initialState, action) {
  switch (action.type) {
    case Types.SET_TALKS:
      return state.merge({ entries: action.talks });
    case Types.FETCH_TALKS:
    default:
      return state;
  }
}
