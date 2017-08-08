import Talk from '../models/talk';
import * as Types from '../constants/actions';

export default function talks(talk = new Talk(), action) {
  switch (action.type) {
    case Types.SET_TALKS:
      return talk.merge({ entries: action.entries });
    case Types.FETCH_TALKS:
    default:
      return talk;
  }
}
