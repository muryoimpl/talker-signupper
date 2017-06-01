import { combineReducers } from 'redux';

import signups from './signups';
import headers from './headers';
import talks from './talks';
import dialogs from './dialogs';

const rootReducer = combineReducers({
  headers,
  signups,
  talks,
  dialogs,
});

export default rootReducer;
