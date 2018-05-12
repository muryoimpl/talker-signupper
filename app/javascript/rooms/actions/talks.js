import * as Types from '../constants/actions';

export function fetchTalks() {
  return { type: Types.FETCH_TALKS };
}

export function setTalks(talks) {
  const payload = { talks };
  return { type: Types.SET_TALKS, payload };
}

export function addTalk(talk) {
  return { type: Types.ADD_TALK, talk };
}

export function loading(isLoading) {
  return { type: Types.LOADING, loading: isLoading };
}

export function shuffleOrder() {
  return { type: Types.SHUFFLE_ORDER };
}

export function nextTalk() {
  return { type: Types.NEXT_TALK };
}

export function pushToCurrent(talk) {
  const payload = { title: talk.get('title'), talkerName: talk.get('talker_name'), id: talk.get('id') };
  return { type: Types.PUSH_TO_CURRENT, payload };
}

export function requestProgressUpdate(talkId, progress) {
  const payload = { id: talkId, progress };
  return { type: Types.REQUEST_PROGRESS_UPDATE, payload };
}

export function updateProgress(talkId, progress) {
  const payload = { id: talkId, progress };
  return { type: Types.UPDATE_PROGRESS, payload };
}
