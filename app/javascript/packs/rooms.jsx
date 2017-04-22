import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import routes from '../rooms/routes';
import configureStore from '../rooms/stores';

const store = configureStore();

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('talker-signupper'),
  );
});
