import React from 'react';
import { Route, IndexRoute, BrowserRouter, Switch } from 'react-router';

import Layout from './components/Layout';
import Room from './components/Room';

export default (
  <BrowserRouter basename="/rooms">
    <Switch>
      <Route path="/" component={Layout}>
        <IndexRoute component={Room} />
      </Route>
    </Switch>
  </BrowserRouter>
);
