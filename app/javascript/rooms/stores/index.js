import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(logger),
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
