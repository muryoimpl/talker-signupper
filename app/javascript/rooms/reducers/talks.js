import * as Immutable from 'immutable';
import Talk, { progress } from '../models/talk';
import * as Types from '../constants/actions';

export default function talks(talk = new Talk(), action) {
  switch (action.type) {
    case Types.SET_TALKS: {
      const allTalks = action.payload.talks.reduce((acc, cur) => {
        if (cur.progress === progress.done.key) {
          acc.done.push(cur);
        } else {
          acc.entries.push(cur);
        }
        return acc;
      }, { entries: [], done: [] });

      return talk.merge({ entries: allTalks.entries, done: allTalks.done });
    }
    case Types.ADD_TALK:
      return talk.merge({ entries: talk.entries.push(Immutable.Map(action.talk)) });
    case Types.LOADING:
      return talk.merge({ loading: action.loading });
    case Types.NEXT_TALK: {
      const nextDone = talk.done.push(talk.entries.first());
      const nextEntries = talk.entries.shift();
      return talk.merge({ entries: nextEntries, done: nextDone });
    }
    case Types.PUSH_TO_CURRENT: {
      const current = Immutable.Map({ title: action.payload.title, talkerName: action.payload.talkerName, id: action.payload.id });
      return talk.merge({ current });
    }
    case Types.FETCH_TALKS:
    case Types.SHUFFLE_ORDER:
    default:
      return talk;
  }
}
