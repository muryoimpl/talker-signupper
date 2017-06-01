import Immutable from 'immutable';
import * as Types from '../constants/actions';

const initialState = new Immutable.Record({
  message: '',
  isDisplay: false,
})();

export default function dialogs(state = initialState, action) {
  switch (action.type) {
    case Types.SHOW_DIALOG:
      return state.merge({ isDisplay: true, message: action.message });
    case Types.CLOSE_DIALOG:
      return state.merge({ isDisplay: false, message: '' });
    default:
      return state;
  }
}
