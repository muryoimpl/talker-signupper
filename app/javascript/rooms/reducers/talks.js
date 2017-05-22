import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({ entries: new Immutable.List([]) });

export default function talks(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_TALKS:
      return state.merge({ entries: action.talks });
    default:
      return state;
  }
}
