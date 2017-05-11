import { combineReducers } from 'redux';

import signups from './signups';
import headers from './headers';

const rootReducer = combineReducers({
  headers,
  signups,
});

export default rootReducer;
