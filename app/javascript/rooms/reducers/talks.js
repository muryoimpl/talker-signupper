import * as Immutable from 'immutable';
import Talk, { progress } from '../models/talk';
import * as Types from '../constants/actions';

function classifyTalks(fetchedTalks) {
  const allTalks = fetchedTalks.reduce((acc, cur) => {
    if (cur.progress === progress.done.key) {
      acc.done.push(cur);
    } else {
      acc.entries.push(cur);
    }
    return acc;
  }, { entries: [], done: [] });

  return allTalks;
}

function updateProgress(talk, payload) {
  const index = talk.entries.findIndex(item => item.get('id') === payload.id);
  const targetTalk = talk.entries.get(index);
  const entries = talk.entries.update(index, () => targetTalk.merge({ progress: payload.progress }));
  return entries;
}

export default function talks(talk = new Talk(), action) {
  switch (action.type) {
    case Types.SET_TALKS: {
      const allTalks = classifyTalks(action.payload.talks);
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
    case Types.UPDATE_PROGRESS: {
      const entries = updateProgress(talk, action.payload);
      return talk.merge({ entries });
    }
    default: // includes Types.FETCH_TALKS, Types.SHUFFLE_ORDER
      return talk;
  }
}
