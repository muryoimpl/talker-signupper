import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({
  signup: 'open',
})();

export default function headers(state = initialState, action) {
  switch (action.type) {
    case Types.CLOSE_SIGN_UP:
      return state.merge({ signup: 'close' });
    case Types.SIGN_UP_TALK:
      return state.merge({ signup: 'open' });
    default:
      return state;
  }
}
