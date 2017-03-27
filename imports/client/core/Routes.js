'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';
import MainLayout from '../MainLayout';

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={MainLayout} />
    </Router>
  </Provider>
)

export default Routes;