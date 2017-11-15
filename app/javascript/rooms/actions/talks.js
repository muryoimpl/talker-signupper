import * as Types from '../constants/actions';

export function fetchTalks() {
  return { type: Types.FETCH_TALKS };
}

export function setTalks(talks) {
  return { type: Types.SET_TALKS, entries: talks };
}

export function addTalk(talk) {
  return { type: Types.ADD_TALK, talk };
}

export function loading(isLoading) {
  return { type: Types.LOADING, loading: isLoading };
}
