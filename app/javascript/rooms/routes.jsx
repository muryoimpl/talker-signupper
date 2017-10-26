import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Room from './components/Room';

export default (
  <BrowserRouter basename="/rooms">
    <Layout>
      <Route exact path="/:name" component={Room} />
    </Layout>
  </BrowserRouter>
);
