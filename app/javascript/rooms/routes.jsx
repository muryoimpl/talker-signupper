import React from 'react';
import { Route, BrowserRouter } from 'react-router';

import Layout from './components/Layout';

export default (
  <BrowserRouter>
    <Route path="/" component={Layout} />
  </BrowserRouter>
);
