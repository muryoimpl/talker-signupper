import { combineReducers } from 'redux';

import rooms from './rooms';
import headers from './headers';

const rootReducer = combineReducers({
  rooms,
  headers,
});

export default rootReducer;
