import Immutable from 'immutable';
// import * as Types from '../constants/actions';

const initialState = new Immutable.Record({
  signup: true,
})();

export default function headers(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
