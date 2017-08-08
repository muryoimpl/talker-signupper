import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Room from './components/Room';

export default (
  <BrowserRouter basename="/rooms/:name">
    <Layout>
      <Route exact path="" component={Room} />
    </Layout>
  </BrowserRouter>
);
