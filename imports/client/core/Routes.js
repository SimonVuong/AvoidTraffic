'use strict';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import MainLayout from '../MainLayout';

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={MainLayout} />
  </Router>
)

export default Routes;