import 'regenerator-runtime/runtime';
import logger from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const finalCreateStore = compose(
  applyMiddleware(logger, sagaMiddleware),
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);
  sagaMiddleware.run(rootSaga);
  return store;
}
