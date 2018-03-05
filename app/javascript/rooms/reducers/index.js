import { combineReducers } from 'redux';

import signups from './signups';
import headers from './headers';
import talks from './talks';
import dialogs from './dialogs';
import globals from './globals';
import authorization from './authorization';
import timer from './timer';

const rootReducer = combineReducers({
  globals,
  headers,
  signups,
  talks,
  dialogs,
  authorization,
  timer,
});

export default rootReducer;
