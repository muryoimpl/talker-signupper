import { combineReducers } from 'redux';

import signups from './signups';
import headers from './headers';
import talks from './talks';

const rootReducer = combineReducers({
  headers,
  signups,
  talks,
});

export default rootReducer;
