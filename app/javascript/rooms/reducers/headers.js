import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({
  signup: 'open',
  roomName: '',
})();

export default function headers(state = initialState, action) {
  switch (action.type) {
    case Types.CLOSE_SIGN_UP:
      return state.merge({ signup: 'close' });
    case Types.SIGN_UP_TALK:
      return state.merge({ signup: 'open' });
    case Types.SET_ROOM_NAME:
      return state.merge({ roomName: action.room });
    case Types.GET_ROOM_NAME:
    default:
      return state;
  }
}
